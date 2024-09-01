import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TypeWriter = ({ text, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return <pre className="bg-gray-800 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">{displayedText}</pre>;
};

const CleanCodeLearning = () => {
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const [showAfter, setShowAfter] = useState({});

  const principles = [
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
      content:
        'Write self-documenting code. Use comments only when necessary to explain intent, not to restate the code.',
      before: `// Bad example
// Check if user is eligible for discount
if (user.totalPurchases > 1000 && user.membershipLevel === 'gold') {
  // Apply 10% discount
  price = price * 0.9;
}`,
      after: `// Good example
const DISCOUNT_THRESHOLD = 1000;
const GOLD_MEMBERSHIP = 'gold';
const DISCOUNT_RATE = 0.1;

function isEligibleForDiscount(user) {
  return user.totalPurchases > DISCOUNT_THRESHOLD && 
         user.membershipLevel === GOLD_MEMBERSHIP;
}

function applyDiscount(price) {
  return price * (1 - DISCOUNT_RATE);
}

if (isEligibleForDiscount(user)) {
  price = applyDiscount(price);
}`,
    },
    {
      id: 4,
      title: "DRY (Don't Repeat Yourself)",
      content: 'Avoid duplicating code. Extract repeated logic into reusable functions or modules.',
      before: `// Bad example
function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\.[^\\s@]+$/;
  return regex.test(email);
}

function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(username);
}

function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(password);
}`,
      after: `// Good example
function validate(value, regex) {
  return regex.test(value);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validateEmail = (email) => validate(email, EMAIL_REGEX);
const validateUsername = (username) => validate(username, USERNAME_REGEX);
const validatePassword = (password) => validate(password, PASSWORD_REGEX);`,
    },
    {
      id: 5,
      title: 'Single Responsibility Principle',
      content:
        'A class should have one, and only one, reason to change. This principle states that every module or class should have responsibility over a single part of the functionality provided by the software.',
      before: `class User {
  constructor(name) {
    this.name = name;
  }

  saveUser() {
    // Save user to database
  }

  sendEmail() {
    // Send email to user
  }

  generateReport() {
    // Generate user report
  }
}`,
      after: `class User {
  constructor(name) {
    this.name = name;
  }
}

class UserPersistence {
  saveUser(user) {
    // Save user to database
  }
}

class UserCommunication {
  sendEmail(user) {
    // Send email to user
  }
}

class UserReporting {
  generateReport(user) {
    // Generate user report
  }
}`,
    },
    {
      id: 6,
      title: 'Open-Closed Principle',
      content:
        "Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification. This means you should be able to extend a class's behavior without modifying it.",
      before: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

class AreaCalculator {
  calculateArea(rectangle) {
    return rectangle.width * rectangle.height;
  }
}`,
      after: `class Shape {
  calculateArea() {}
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}

class AreaCalculator {
  calculateArea(shape) {
    return shape.calculateArea();
  }
}`,
    },
    {
      id: 7,
      title: 'Liskov Substitution Principle',
      content:
        'Objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program. In other words, what you can do with a type, you should also be able to do with its subtypes.',
      before: `class Bird {
  fly() {
    console.log("I can fly");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Sorry, I can't fly");
  }
}

function makeBirdFly(bird) {
  bird.fly();
}

// This will throw an error
makeBirdFly(new Penguin());`,
      after: `class Bird {
  move() {}
}

class FlyingBird extends Bird {
  move() {
    console.log("I can fly");
  }
}

class SwimmingBird extends Bird {
  move() {
    console.log("I can swim");
  }
}

function makeBirdMove(bird) {
  bird.move();
}

// This works for all types of birds
makeBirdMove(new FlyingBird());
makeBirdMove(new SwimmingBird());`,
    },
    {
      id: 8,
      title: 'Interface Segregation Principle',
      content:
        'No client should be forced to depend on methods it does not use. This principle aims at splitting interfaces that are very large into smaller and more specific ones.',
      before: `interface Worker {
  work();
  eat();
  sleep();
}

class Human implements Worker {
  work() { /* ... */ }
  eat() { /* ... */ }
  sleep() { /* ... */ }
}

class Robot implements Worker {
  work() { /* ... */ }
  eat() { throw new Error("Robots don't eat"); }
  sleep() { throw new Error("Robots don't sleep"); }
}`,
      after: `interface Workable {
  work();
}

interface Eatable {
  eat();
}

interface Sleepable {
  sleep();
}

class Human implements Workable, Eatable, Sleepable {
  work() { /* ... */ }
  eat() { /* ... */ }
  sleep() { /* ... */ }
}

class Robot implements Workable {
  work() { /* ... */ }
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

  const togglePrinciple = (id) => {
    setExpandedPrinciple(expandedPrinciple === id ? null : id);
    setShowAfter({});
  };

  const toggleAfterCode = (id) => {
    setShowAfter((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">Clean Code Learning</h1>
      </header>
      <main className="container mx-auto mt-8 p-4">
        <section className="mb-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Welcome to Clean Code Learning</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Explore these essential clean code principles, including detailed explanations of SOLID principles, to
            improve your code quality, readability, and maintainability. Each principle includes examples to illustrate
            good and bad practices.
          </p>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Clean Code Principles and Examples</h2>
          <ul className="space-y-6">
            {principles.map((principle) => (
              <li key={principle.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
                <button
                  onClick={() => togglePrinciple(principle.id)}
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                >
                  <h3 className="text-2xl font-semibold text-blue-700">{principle.title}</h3>
                  {expandedPrinciple === principle.id ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-blue-500" />}
                </button>
                {expandedPrinciple === principle.id && (
                  <div className="p-6 bg-gray-50">
                    <p className="mb-6 text-gray-700 leading-relaxed">{principle.content}</p>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-blue-600">Before:</h4>
                        <TypeWriter text={principle.before} />
                      </div>
                      <button
                        onClick={() => toggleAfterCode(principle.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      >
                        {showAfter[principle.id] ? 'Hide' : 'Show'} Improved Code
                      </button>
                      {showAfter[principle.id] && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2 text-blue-600">After:</h4>
                          <TypeWriter text={principle.after} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-6 mt-12 text-center">
        <p>&copy; 2024 Clean Code Learning. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CleanCodeLearning;