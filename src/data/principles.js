export const principles = [
    {
        id: 1,
        title: 'Meaningful Names',
        content:
            'Use intention-revealing names. Choose names that reflect the purpose of the variable, function, or class.',
        before: `// Bad example
int d; // elapsed time in days
if (d > 30) {
  // do something
}`,
        after: `// Good example
int elapsedTimeInDays;
if (elapsedTimeInDays > 30) {
  // do something
}`,
    },
    {
        id: 2,
        title: 'Functions',
        content:
            'Keep functions small and focused on a single task. Aim for functions that are no more than 20 lines long.',
        before: `// Bad example
function processData(data) {
  // 100 lines of code doing multiple things
  // Validation
  // Processing
  // Saving
  // Reporting
}`,
        after: `// Good example
function processData(data) {
  if (isValid(data)) {
    const processedData = transform(data);
    save(processedData);
    generateReport(processedData);
  }
}

function isValid(data) {
  // Validation logic
}

function transform(data) {
  // Transformation logic
}

function save(data) {
  // Saving logic
}

function generateReport(data) {
  // Reporting logic
}`,
    },
    {
        id: 3,
        title: 'Comments',
        content: 'Use comments to explain intent and clarify complex logic, not to restate the obvious.',
        before: `// Calculate age
int age = currentYear - birthYear;

// Check if user is eligible for discount
if (user.totalPurchases > 1000 && user.membershipLevel === 'gold') {
  // Apply 10% discount
  price = price * 0.9;
}`,
        after: `int age = currentYear - birthYear;

// Users with over $1000 in purchases and gold membership get a 10% discount
if (isEligibleForDiscount(user)) {
  price = applyDiscount(price);
}

function isEligibleForDiscount(user) {
  return user.totalPurchases > 1000 && user.membershipLevel === 'gold';
}

function applyDiscount(price) {
  const DISCOUNT_RATE = 0.1;
  return price * (1 - DISCOUNT_RATE);
}`,
    },
    {
        id: 4,
        title: "DRY (Don't Repeat Yourself)",
        content: 'Avoid duplicating code. Extract repeated logic into reusable functions or modules.',
        before: `// Bad example
public class Validator {
    public boolean validateEmail(String email) {
        String regex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        return email.matches(regex);
    }

    public boolean validateUsername(String username) {
        String regex = "^[a-zA-Z0-9_]+$";
        return username.matches(regex);
    }

    public boolean validatePassword(String password) {
        String regex = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";
        return password.matches(regex);
    }
}`,
        after: `// Good example
public class Validator {
    private static final String EMAIL_REGEX = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
    private static final String USERNAME_REGEX = "^[a-zA-Z0-9_]+$";
    private static final String PASSWORD_REGEX = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";

    public boolean validate(String value, String regex) {
        return value.matches(regex);
    }

    public boolean validateEmail(String email) {
        return validate(email, EMAIL_REGEX);
    }

    public boolean validateUsername(String username) {
        return validate(username, USERNAME_REGEX);
    }

    public boolean validatePassword(String password) {
        return validate(password, PASSWORD_REGEX);
    }
}`,
    },
    {
        id: 5,
        title: 'Single Responsibility Principle',
        content:
            'A class should have one, and only one, reason to change. This principle states that every module or class should have responsibility over a single part of the functionality provided by the software.',
        before: `public class User {
    private String name;

    public User(String name) {
        this.name = name;
    }

    public void saveUser() {
        // Save user to database
    }

    public void sendEmail() {
        // Send email to user
    }

    public void generateReport() {
        // Generate user report
    }
}`,
        after: `public class User {
    private String name;

    public User(String name) {
        this.name = name;
    }
}

public class UserPersistence {
    public void saveUser(User user) {
        // Save user to database
    }
}

public class UserCommunication {
    public void sendEmail(User user) {
        // Send email to user
    }
}

public class UserReporting {
    public void generateReport(User user) {
        // Generate user report
    }
}`,
    },
    {
        id: 6,
        title: 'Open-Closed Principle',
        content:
            "Software entities should be open for extension, but closed for modification. This means you should be able to extend a class's behavior without modifying it.",
        before: `public class Discount {
    public double calculateDiscount(Order order) {
        if (order.getType().equals("STANDARD")) {
            return order.getTotalPrice() * 0.1;
        } else if (order.getType().equals("PREMIUM")) {
            return order.getTotalPrice() * 0.2;
        }
        return 0;
    }
}`,
        after: `public abstract class Discount {
    public abstract double calculateDiscount(Order order);
}

public class StandardDiscount extends Discount {
    @Override
    public double calculateDiscount(Order order) {
        return order.getTotalPrice() * 0.1;
    }
}

public class PremiumDiscount extends Discount {
    @Override
    public double calculateDiscount(Order order) {
        return order.getTotalPrice() * 0.2;
    }
}

public class GoldDiscount extends Discount {
    @Override
    public double calculateDiscount(Order order) {
        return order.getTotalPrice() * 0.3;
    }
}

public class DiscountCalculator {
    private Discount discount;

    public DiscountCalculator(Discount discount) {
        this.discount = discount;
    }

    public double calculate(Order order) {
        return discount.calculateDiscount(order);
    }
}`,
    },
    {
        id: 7,
        title: 'Liskov Substitution Principle',
        content:
            'Objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.',
        before: `public class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getArea() {
        return width * height;
    }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        super.setWidth(width);
        super.setHeight(width);
    }

    @Override
    public void setHeight(int height) {
        super.setWidth(height);
        super.setHeight(height);
    }
}

public class Main {
    public static void printArea(Rectangle rectangle) {
        rectangle.setWidth(4);
        rectangle.setHeight(5);
        System.out.println(rectangle.getArea()); // Expected: 20
    }

    public static void main(String[] args) {
        printArea(new Rectangle()); // Outputs: 20
        printArea(new Square()); // Outputs: 25 (violates LSP)
    }
}`,
        after: `public abstract class Shape {
    public abstract int getArea();
}

public class Rectangle extends Shape {
    private int width;
    private int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public int getArea() {
        return width * height;
    }
}

public class Square extends Shape {
    private int side;

    public Square(int side) {
        this.side = side;
    }

    @Override
    public int getArea() {
        return side * side;
    }
}

public class Main {
    public static void printArea(Shape shape) {
        System.out.println(shape.getArea());
    }

    public static void main(String[] args) {
        printArea(new Rectangle(4, 5)); // Outputs: 20
        printArea(new Square(5)); // Outputs: 25
    }
}`,
    },
    {
        id: 8,
        title: 'Interface Segregation Principle',
        content:
            'No client should be forced to depend on methods it does not use. This principle aims at splitting interfaces that are very large into smaller and more specific ones.',
        before: `public interface Worker {
    void work();
    void eat();
    void sleep();
}

public class Human implements Worker {
    public void work() { /* ... */ }
    public void eat() { /* ... */ }
    public void sleep() { /* ... */ }
}

public class Robot implements Worker {
    public void work() { /* ... */ }
    public void eat() { throw new UnsupportedOperationException("Robots don't eat"); }
    public void sleep() { throw new UnsupportedOperationException("Robots don't sleep"); }
}`,
        after: `public interface Workable {
    void work();
}

public interface Eatable {
    void eat();
}

public interface Sleepable {
    void sleep();
}

public class Human implements Workable, Eatable, Sleepable {
    public void work() { /* ... */ }
    public void eat() { /* ... */ }
    public void sleep() { /* ... */ }
}

public class Robot implements Workable {
    public void work() { /* ... */ }
}`,
    },
    {
        id: 9,
        title: 'Dependency Inversion Principle',
        content:
            'High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.',
        before: `class EmailSender {
  sendEmail(message) {
    // Send email logic
  }
}

class Notifier {
  constructor() {
    this.emailSender = new EmailSender();
  }

  notify(message) {
    this.emailSender.sendEmail(message);
  }
}`,
        after: `interface MessageSender {
  sendMessage(message: string): void;
}

class EmailSender implements MessageSender {
  sendMessage(message: string) {
    // Send email logic
  }
}

class SMSSender implements MessageSender {
  sendMessage(message: string) {
    // Send SMS logic
  }
}

class Notifier {
  constructor(private messageSender: MessageSender) {}

  notify(message: string) {
    this.messageSender.sendMessage(message);
  }
}

// Usage
const emailNotifier = new Notifier(new EmailSender());
const smsNotifier = new Notifier(new SMSSender());`,
    },
    {
        id: 10,
        title: 'Error Handling',
        content: 'Use exceptions for error handling instead of return codes. Catch exceptions at the appropriate level.',
        before: `// Bad example
function divide(a, b) {
  if (b === 0) {
    return -1; // Error code for division by zero
  }
  return a / b;
}

const result = divide(10, 0);
if (result === -1) {
  console.log("Error: Division by zero");
} else {
  console.log("Result:", result);
}`,
        after: `// Good example
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log("Result:", result);
} catch (error) {
  console.error("Error:", error.message);
}`,
    },
    {
        id: 11,
        title: 'Code Formatting',
        content: 'Maintain consistent code formatting. Use automated tools to enforce style guidelines.',
        before: `// Bad example
function badlyFormattedFunction(param1,param2){
if(param1>param2){
return true;
}
else{
return false;
}}`,
        after: `// Good example
function wellFormattedFunction(param1, param2) {
  if (param1 > param2) {
    return true;
  } else {
    return false;
  }
}`,
    },
    {
        id: 12,
        title: 'Avoid Magic Numbers',
        content: 'Replace magic numbers with named constants to improve readability and maintainability.',
        before: `// Bad example
if (user.age >= 18) {
  console.log("User is an adult");
}

const rectangleArea = width * 3.14159;`,
        after: `// Good example
const ADULT_AGE = 18;
if (user.age >= ADULT_AGE) {
  console.log("User is an adult");
}

const PI = 3.14159;
const rectangleArea = width * PI;`,
    },
];