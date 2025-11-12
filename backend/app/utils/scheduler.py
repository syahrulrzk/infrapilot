import schedule
import time
import threading
from datetime import datetime
from app.database.session import get_db
from app.models.automation import AutomationTask
from app.models.notification import Notification

class TaskScheduler:
    def __init__(self):
        self.running = False
        self.thread = None

    def start(self):
        """Start the scheduler in a separate thread"""
        if not self.running:
            self.running = True
            self.thread = threading.Thread(target=self._run_scheduler)
            self.thread.daemon = True
            self.thread.start()
            print("Task scheduler started")

    def stop(self):
        """Stop the scheduler"""
        self.running = False
        if self.thread:
            self.thread.join()
        print("Task scheduler stopped")

    def _run_scheduler(self):
        """Run the scheduler loop"""
        while self.running:
            schedule.run_pending()
            time.sleep(1)

    def add_task(self, task: AutomationTask):
        """Add a task to the scheduler"""
        if task.enabled and task.schedule:
            try:
                # Parse the cron expression and schedule the task
                # For simplicity, we'll use a basic approach
                # In a real implementation, you'd want to parse the cron expression properly
                if task.schedule == "daily":
                    schedule.every().day.at("02:00").do(self._execute_task, task.id)
                elif task.schedule == "weekly":
                    schedule.every().week.do(self._execute_task, task.id)
                elif task.schedule == "hourly":
                    schedule.every().hour.do(self._execute_task, task.id)
                else:
                    # Default to daily if schedule is not recognized
                    schedule.every().day.at("02:00").do(self._execute_task, task.id)
                print(f"Scheduled task {task.name} with schedule {task.schedule}")
            except Exception as e:
                print(f"Error scheduling task {task.name}: {str(e)}")

    def remove_task(self, task_id: int):
        """Remove a task from the scheduler"""
        # In a real implementation, you'd want to remove the specific job
        # For now, we'll just clear all jobs and reschedule
        schedule.clear()
        print(f"Removed task {task_id} from scheduler")

    def _execute_task(self, task_id: int):
        """Execute a scheduled task"""
        db = None
        task = None
        try:
            # Get database session
            db = next(get_db())
            
            # Get the task
            task = db.query(AutomationTask).filter(AutomationTask.id == task_id).first()
            if not task:
                print(f"Task {task_id} not found")
                return
            
            # Update last run time
            task.last_run = datetime.utcnow()
            
            # Execute the task based on its type
            if task.task_type == "backup":
                self._execute_backup_task(task, db)
            elif task.task_type == "patch":
                self._execute_patch_task(task, db)
            elif task.task_type == "cleanup":
                self._execute_cleanup_task(task, db)
            else:
                print(f"Unknown task type: {task.task_type}")
            
            # Update next run time (simplified)
            task.next_run = datetime.utcnow()
            
            # Commit changes
            db.commit()
            
            print(f"Executed task {task.name} successfully")
        except Exception as e:
            print(f"Error executing task {task_id}: {str(e)}")
            # Create a notification about the failure
            if db and task:
                self._create_notification(db, task.user_id, "Task Execution Failed", 
                                        f"Task '{task.name}' failed with error: {str(e)}", "error")

    def _execute_backup_task(self, task: AutomationTask, db):
        """Execute a backup task"""
        # In a real implementation, this would perform actual backup operations
        print(f"Executing backup task: {task.name}")
        self._create_notification(db, task.user_id, "Backup Completed", 
                                f"Backup task '{task.name}' completed successfully", "success")

    def _execute_patch_task(self, task: AutomationTask, db):
        """Execute a patch task"""
        # In a real implementation, this would perform actual patch operations
        print(f"Executing patch task: {task.name}")
        self._create_notification(db, task.user_id, "Patch Completed", 
                                f"Patch task '{task.name}' completed successfully", "success")

    def _execute_cleanup_task(self, task: AutomationTask, db):
        """Execute a cleanup task"""
        # In a real implementation, this would perform actual cleanup operations
        print(f"Executing cleanup task: {task.name}")
        self._create_notification(db, task.user_id, "Cleanup Completed", 
                                f"Cleanup task '{task.name}' completed successfully", "success")

    def _create_notification(self, db, user_id: int, title: str, message: str, type: str):
        """Create a notification in the database"""
        try:
            notification = Notification(
                title=title,
                message=message,
                type=type,
                user_id=user_id
            )
            db.add(notification)
            db.commit()
        except Exception as e:
            print(f"Error creating notification: {str(e)}")
            db.rollback()

# Create a global scheduler instance
scheduler = TaskScheduler()