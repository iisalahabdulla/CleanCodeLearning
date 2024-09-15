export const principles = [
    {
        id: 1,
        title: "Meaningful names",
        content:
            "Use specific, context-rich names for classes, methods, and variables. Choose names that precisely convey the purpose, meaning, and domain context of the code elements they represent, eliminating the need for clarifying comments.",
        before: `// Bad example
    public class ProjectDuration {
        public void process() {
            int d; // elapsed time in days
            if (d > 30) {
                // do something
            }
        }
    }`,
        after: `// Good example
    public class ProjectDurationTracker {
        public void checkForExtendedDuration() {
            int projectDurationInDays;
            final int STANDARD_PROJECT_DURATION = 30;
            
            if (projectDurationInDays > STANDARD_PROJECT_DURATION) {
                // Handle extended duration
            }
        }
    }`,
    },
    {
        id: 2,
        title: "Single Responsibility Functions",
        content:
            "Keep functions small and focused on a single task. This improves readability, testability, and maintainability. Use clear, concise names for classes and methods that indicate their role in the system.",
        before: `// Bad example
public class OrderService {
    public void processOrder(Order order) {
        // Validate order
        // Calculate total
        // Apply discount
        // Save to database
        // Send confirmation email
    }
}`,
        after: `// Good example
public class OrderService {
    private final ValidationService validationService;
    private final PricingService pricingService;
    private final DiscountService discountService;
    private final DatabaseService databaseService;
    private final EmailService emailService;

    public void processOrder(Order order) {
        validationService.validate(order);
        pricingService.calculateTotal(order);
        discountService.applyDiscount(order);
        databaseService.saveOrder(order);
        emailService.sendConfirmation(order);
    }
}

// Additional classes: ValidationService, PricingService, DiscountService, DatabaseService, EmailService
`,
    },
    {
        id: 3,
        title: "Effective Comments",
        content:
            "Use comments to explain intent, clarify complex logic, or provide context that isn't immediately obvious from the code. Avoid comments that merely restate what the code is doing.",
        before: `public class User {
    // Method to calculate age
    public int calculateAge(int currentYear, int birthYear) {
        // Subtract birth year from current year
        return currentYear - birthYear;
    }

    // Method to check if user is eligible for discount
    public boolean isEligibleForDiscount(User user) {
        // Check if total purchases are over 1000 and membership is gold
        if (user.getTotalPurchases() > 1000 && user.getMembershipLevel().equals("gold")) {
            // User is eligible for discount
            return true;
        }
        // User is not eligible for discount
        return false;
    }

    // Method to apply discount
    public double applyDiscount(double price) {
        // Define discount rate
        double discountRate = 0.1;
        // Calculate discounted price
        double discountedPrice = price * (1 - discountRate);
        // Return discounted price
        return discountedPrice;
    }
}`,
        after: `public class User {
    public int calculateAge(int currentYear, int birthYear) {
        return currentYear - birthYear;
    }

    public boolean isEligibleForDiscount(User user) {
        return user.getTotalPurchases() > 1000 && user.getMembershipLevel().equals("gold");
    }

    public double applyDiscount(double price) {
        // 10% discount for eligible users
        final double DISCOUNT_RATE = 0.1;
        return price * (1 - DISCOUNT_RATE);
    }

    /**
     * Calculates the user's loyalty score based on their purchase history and account age.
     * The score is used to determine eligibility for special promotions.
     * 
     * @param purchaseHistory List of user's past purchases
     * @param accountAgeInYears Number of years the user has had an account
     * @return Loyalty score between 0 and 100
     */
    public int calculateLoyaltyScore(List<Purchase> purchaseHistory, int accountAgeInYears) {
        int score = 0;
        
        // Add 1 point for each year the account has been active, up to 5 points
        score += Math.min(accountAgeInYears, 5);
        
        // Add points based on total purchase amount
        double totalPurchaseAmount = purchaseHistory.stream()
                                        .mapToDouble(Purchase::getAmount)
                                        .sum();
        score += Math.min((int)(totalPurchaseAmount / 100), 50);
        
        // Add bonus points for frequent purchases in the last year
        long recentPurchases = purchaseHistory.stream()
                                .filter(p -> p.getDate().isAfter(LocalDate.now().minusYears(1)))
                                .count();
        score += Math.min(recentPurchases * 2, 30);
        
        return Math.min(score, 100);  // Cap the score at 100
    }
}`,
    },
    {
        id: 4,
        title: "DRY (Don't Repeat Yourself)",
        content:
            "Avoid duplicating code by extracting common logic into reusable functions or utilities. Balance this with maintaining clear, cohesive services. This improves maintainability, reduces errors, and makes code easier to update while keeping related functionality together.",
        before: `// Bad example with code duplication
public class UserService {
    public void registerUser(String username, String email, String password) {
        // Validate username
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (!username.matches("^[a-zA-Z0-9_]+$")) {
            throw new IllegalArgumentException("Invalid username format");
        }

        // Validate email
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Invalid email format");
        }

        // Validate password
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        if (!password.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")) {
            throw new IllegalArgumentException("Invalid password format");
        }

        saveUser(username, email, password);
    }

    public void updateUserProfile(String username, String email) {
        // Duplicate validation logic
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (!username.matches("^[a-zA-Z0-9_]+$")) {
            throw new IllegalArgumentException("Invalid username format");
        }

        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            throw new IllegalArgumentException("Invalid email format");
        }

        updateUser(username, email);
    }

    private void saveUser(String username, String email, String password) {
        // Logic to save user to database
    }

    private void updateUser(String username, String email) {
        // Logic to update user in database
    }
}`,
        after: `// Good example with balanced DRY approach
public class UserService {
    public void registerUser(String username, String email, String password) {
        validateUsername(username);
        validateEmail(email);
        validatePassword(password);

        saveUser(username, email, password);
    }

    public void updateUserProfile(String username, String email) {
        validateUsername(username);
        validateEmail(email);

        updateUser(username, email);
    }

    private void validateUsername(String username) {
        ValidationUtils.validateNotEmpty(username, "Username");
        ValidationUtils.validateFormat(username, ValidationPatterns.USERNAME_REGEX, "Invalid username format");
    }

    private void validateEmail(String email) {
        ValidationUtils.validateNotEmpty(email, "Email");
        ValidationUtils.validateFormat(email, ValidationPatterns.EMAIL_REGEX, "Invalid email format");
    }

    private void validatePassword(String password) {
        ValidationUtils.validateNotEmpty(password, "Password");
        ValidationUtils.validateFormat(password, ValidationPatterns.PASSWORD_REGEX, "Invalid password format");
    }

    private void saveUser(String username, String email, String password) {
        // Logic to save user to database
    }

    private void updateUser(String username, String email) {
        // Logic to update user in database
    }
}

public class ValidationUtils {
    public static void validateNotEmpty(String value, String fieldName) {
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException(fieldName + " cannot be empty");
        }
    }

    public static void validateFormat(String value, String regex, String errorMessage) {
        if (!value.matches(regex)) {
            throw new IllegalArgumentException(errorMessage);
        }
    }
}

public class ValidationPatterns {
    public static final String USERNAME_REGEX = "^[a-zA-Z0-9_]+$";
    public static final String EMAIL_REGEX = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
    public static final String PASSWORD_REGEX = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";
}`,
    },{
        id: 5,
        title: "Single Responsibility Principle",
        content:
            "A class should have one, and only one, reason to change. This principle promotes focused, cohesive classes that are easier to maintain and understand.",
        before: `// Violates SRP
    public class Employee {
        private String name;
        private String email;
    
        public Employee(String name, String email) {
            this.name = name;
            this.email = email;
        }
    
        public void save() {
            // Save employee to database
            System.out.println("Saving employee: " + name);
        }
    
        public void sendEmail(String message) {
            // Send email to employee
            System.out.println("Sending email to: " + email);
        }
    
        public String generateReport() {
            // Generate employee report
            return "Report for employee: " + name;
        }
    }
    
    // Usage
    public class Main {
        public static void main(String[] args) {
            Employee employee = new Employee("John Doe", "john@example.com");
            employee.save();
            employee.sendEmail("Welcome aboard!");
            String report = employee.generateReport();
            System.out.println(report);
        }
    }`,
        after: `// Follows SRP
    public class Employee {
        private String name;
        private String email;
    
        public Employee(String name, String email) {
            this.name = name;
            this.email = email;
        }
    
        public String getName() {
            return name;
        }
    
        public String getEmail() {
            return email;
        }
    }
    
    public class EmployeeService {
        private EmployeeRepository repository;
        private EmailService emailService;
        private ReportGenerator reportGenerator;
    
        public EmployeeService(EmployeeRepository repository, EmailService emailService, ReportGenerator reportGenerator) {
            this.repository = repository;
            this.emailService = emailService;
            this.reportGenerator = reportGenerator;
        }
    
        public void saveEmployee(Employee employee) {
            repository.save(employee);
        }
    
        public void sendWelcomeEmail(Employee employee) {
            emailService.sendEmail(employee, "Welcome aboard!");
        }
    
        public String generateEmployeeReport(Employee employee) {
            return reportGenerator.generateReport(employee);
        }
    }
    
    public class EmployeeRepository {
        public void save(Employee employee) {
            System.out.println("Saving employee: " + employee.getName());
        }
    }
    
    public class EmailService {
        public void sendEmail(Employee employee, String message) {
            System.out.println("Sending email to: " + employee.getEmail());
        }
    }
    
    public class ReportGenerator {
        public String generateReport(Employee employee) {
            return "Report for employee: " + employee.getName();
        }
    }
    
    // Usage
    public class Main {
        public static void main(String[] args) {
            EmployeeRepository repository = new EmployeeRepository();
            EmailService emailService = new EmailService();
            ReportGenerator reportGenerator = new ReportGenerator();
            
            EmployeeService employeeService = new EmployeeService(repository, emailService, reportGenerator);
    
            Employee employee = new Employee("John Doe", "john@example.com");
            
            employeeService.saveEmployee(employee);
            employeeService.sendWelcomeEmail(employee);
            String report = employeeService.generateEmployeeReport(employee);
            System.out.println(report);
        }
    }`,
    },
    {
        id: 6,
        title: "Open-Closed Principle",
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
        title: "Liskov Substitution Principle",
        content:
            "Objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.",
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
        title: "Interface Segregation Principle",
        content:
            "No client should be forced to depend on methods it does not use. This principle aims at splitting interfaces that are very large into smaller and more specific ones.",
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
        title: "Dependency Inversion Principle",
        content:
            "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.",
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
        title: "Error Handling",
        content:
            "Use exceptions for error handling instead of return codes. Catch exceptions at the appropriate level.",
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
        title: "Code Formatting",
        content:
            "Maintain consistent code formatting. Use automated tools to enforce style guidelines.",
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
        title: "Avoid Magic Numbers",
        content:
            "Replace magic numbers with named constants to improve readability and maintainability.",
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
