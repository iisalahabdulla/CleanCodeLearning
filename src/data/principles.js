export const principles = [
    {
        id: 1,
        title: 'Meaningful names',
        content:
            'Use intention-revealing names. Choose names that reflect the purpose of the variable, function, or class.',
        before: `// Bad example
public class Example {
    public void process() {
        int d; // elapsed time in days
        if (d > 30) {
            // do something
        }
    }
}`,
        after: `// Good example
public class Example {
    public void process() {
        int elapsedTimeInDays;
        if (elapsedTimeInDays > 30) {
            // do something
        }
    }
}`,
    },
    {
        id: 2,
        title: 'Functions',
        content:
            'Keep functions small and focused on a single task. Aim for functions that are no more than 20 lines long.',
        before: `// Bad example
public class DataProcessor {
    public void processData(Data data) {
        // 100 lines of code doing multiple things
        // Validation
        // Processing
        // Saving
        // Reporting
    }
}`,
        after: `// Good example
public class DataProcessor {
    public void processData(Data data) {
        if (isValid(data)) {
            Data processedData = transform(data);
            save(processedData);
            generateReport(processedData);
        }
    }

    private boolean isValid(Data data) {
        // Validation logic
        return true;
    }

    private Data transform(Data data) {
        // Transformation logic
        return data;
    }

    private void save(Data data) {
        // Saving logic
    }

    private void generateReport(Data data) {
        // Reporting logic
    }
}`,
    },
    {
        id: 3,
        title: 'Comments',
        content: 'Use comments to explain intent and clarify complex logic, not to restate the obvious.',
        before: `public class User {
    // Calculate age
    public int calculateAge(int currentYear, int birthYear) {
        return currentYear - birthYear;
    }

    // Check if user is eligible for discount
    public boolean isEligibleForDiscount(User user) {
        if (user.getTotalPurchases() > 1000 && user.getMembershipLevel().equals("gold")) {
            // Apply 10% discount
            return true;
        }
        return false;
    }
}`,
        after: `public class User {
    public int calculateAge(int currentYear, int birthYear) {
        return currentYear - birthYear;
    }

    // Users with over $1000 in purchases and gold membership get a 10% discount
    public boolean isEligibleForDiscount(User user) {
        return user.getTotalPurchases() > 1000 && user.getMembershipLevel().equals("gold");
    }

    public double applyDiscount(double price) {
        final double DISCOUNT_RATE = 0.1;
        return price * (1 - DISCOUNT_RATE);
    }
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
        before: `// Bad example - violates LSP
public class Bird {
    public void fly() {
        System.out.println("I can fly");
    }
}

public class Ostrich extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("I can't fly");
    }
}

public class BirdTest {
    public static void makeBirdFly(Bird bird) {
        bird.fly();
    }

    public static void main(String[] args) {
        Bird sparrow = new Bird();
        Bird ostrich = new Ostrich();

        makeBirdFly(sparrow); // Works fine
        makeBirdFly(ostrich); // Throws an exception, violating LSP
    }
}`,
        after: `// Good example - adheres to LSP
public abstract class Animal {
    public abstract void move();
}

public class FlyingAnimal extends Animal {
    public void fly() {
        System.out.println("I can fly");
    }

    @Override
    public void move() {
        fly();
    }
}

public class RunningAnimal extends Animal {
    public void run() {
        System.out.println("I can run");
    }

    @Override
    public void move() {
        run();
    }
}

public class AnimalTest {
    public static void makeAnimalMove(Animal animal) {
        animal.move();
    }

    public static void main(String[] args) {
        Animal bird = new FlyingAnimal();
        Animal ostrich = new RunningAnimal();

        makeAnimalMove(bird);    // Outputs: I can fly
        makeAnimalMove(ostrich); // Outputs: I can run
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
    public void sendEmail(String message) {
        // Send email logic
    }
}

class Notifier {
    private EmailSender emailSender;

    public Notifier() {
        this.emailSender = new EmailSender();
    }

    public void notify(String message) {
        this.emailSender.sendEmail(message);
    }
}`,
        after: `interface MessageSender {
    void sendMessage(String message);
}

class EmailSender implements MessageSender {
    public void sendMessage(String message) {
        // Send email logic
    }
}

class SMSSender implements MessageSender {
    public void sendMessage(String message) {
        // Send SMS logic
    }
}

class Notifier {
    private MessageSender messageSender;

    public Notifier(MessageSender messageSender) {
        this.messageSender = messageSender;
    }

    public void notify(String message) {
        this.messageSender.sendMessage(message);
    }
}

// Usage
class Main {
    public static void main(String[] args) {
        Notifier emailNotifier = new Notifier(new EmailSender());
        Notifier smsNotifier = new Notifier(new SMSSender());
    }
}`,
    },
    {
        id: 10,
        title: 'Error Handling',
        content: 'Use exceptions for error handling instead of return codes. Catch exceptions at the appropriate level.',
        before: `// Bad example
public class Calculator {
    public int divide(int a, int b) {
        if (b == 0) {
            return -1; // Error code for division by zero
        }
        return a / b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int result = calc.divide(10, 0);
        if (result == -1) {
            System.out.println("Error: Division by zero");
        } else {
            System.out.println("Result: " + result);
        }
    }
}`,
        after: `// Good example
public class Calculator {
    public int divide(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        try {
            int result = calc.divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
    },
    {
        id: 11,
        title: 'Code Formatting',
        content: 'Maintain consistent code formatting. Use automated tools to enforce style guidelines.',
        before: `// Bad example
public class BadlyFormattedClass{
public void badlyFormattedMethod(int param1,String param2){
if(param1>0){
System.out.println(param2);
}else{
System.out.println("Negative value");
}}}`,
        after: `// Good example
public class WellFormattedClass {
    public void wellFormattedMethod(int param1, String param2) {
        if (param1 > 0) {
            System.out.println(param2);
        } else {
            System.out.println("Negative value");
        }
    }
}`,
    },
    {
        id: 12,
        title: 'Avoid Magic Numbers',
        content: 'Replace magic numbers with named constants to improve readability and maintainability.',
        before: `// Bad example
public class Circle {
    public double calculateArea(double radius) {
        return 3.14159 * radius * radius;
    }
}

public class AgeChecker {
    public boolean isAdult(int age) {
        return age >= 18;
    }
}`,
        after: `// Good example
public class Circle {
    private static final double PI = 3.14159;

    public double calculateArea(double radius) {
        return PI * radius * radius;
    }
}

public class AgeChecker {
    private static final int ADULT_AGE = 18;

    public boolean isAdult(int age) {
        return age >= ADULT_AGE;
    }
}`,
    },
];