**Full-Stack Developer Technical Test: Optimized To-Do List Application**

## **Overview**
In this technical test, you will build a **To-Do List Application** with a React frontend and a Node.js backend using Prisma as the ORM. While the UI does not need to be visually appealing, it should be **clean and user-friendly**.

Your goal is not just to implement functionality but to **write optimized, scalable, and well-structured code**.

---

## **1. Database Models (Prisma Schema)**
You will need the following models:

### TODO
- title, description, status and collection 

Your first task is to **define these models in Prisma** and run `prisma migrate` to apply them to the database.

---

## **2. To-Do Page (Frontend Implementation)**
Create a **page where users can view their to-dos**. On this page, users should be able to:

- **Create a new to-do**
- **Delete an existing to-do**
- **Update a to-do’s status (mark as completed/not completed)**
- **Filter to-dos by status (completed or not completed)**

Ensure that the UI is responsive and updates efficiently when data changes.

---

## **3. Collections and Optimized To-Do Addition**
### **Functionality**
- A user should be able to create a **collection**.
- A user should be able to **add a to-do to a collection**.
- A user should be able to **filter to-dos by collection**.
- A user should be able to **view a collection and see all its to-dos**.

### **Optimization Challenge**
- Implement **batch insertion** when adding multiple to-dos to a collection to avoid excessive database writes.
- Ensure that your queries are **optimized using indexes**.
- Minimize the number of API calls required for updates.

---

## **4. Performance Optimization Challenge**
- Prevent **unnecessary re-renders** in React.
- Implement **caching** so that to-dos are not refetched unnecessarily.
- Ensure efficient state management without excessive API requests.

---

## **5. Validation Constraints (Final Challenge)**
To ensure **data integrity**, add the following constraints for to-do titles:

1. The **title** must be between **5 and 20 words**.
2. The **title cannot start with a number or a special character**.
3. The **title must start with a capital letter**.

### **Example Valid Titles:**
✅ "Organize project tasks and set deadlines"  
✅ "Plan the weekly grocery shopping list"  

### **Example Invalid Titles:**
❌ "123 Complete this task" (Starts with a number)  
❌ "!Fix bug in production" (Starts with a special character)  
❌ "fix this bug" (Does not start with a capital letter)  

---