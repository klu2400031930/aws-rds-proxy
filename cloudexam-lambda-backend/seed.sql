-- Insert exams
INSERT INTO exams (id, title, description, duration_minutes, total_marks, passing_marks) VALUES
(1, 'Java Programming', 'Comprehensive test on Core Java, OOPs, and Collections framework.', 60, 60, 24),
(2, 'Cloud Computing', 'Test your knowledge on AWS, Azure, Serverless architectures and cloud concepts.', 45, 50, 20),
(3, 'Cyber Security Fundamentals', 'Basic principles of cryptography, network security, and ethical hacking.', 60, 60, 24)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title, 
    description = EXCLUDED.description, 
    duration_minutes = EXCLUDED.duration_minutes, 
    total_marks = EXCLUDED.total_marks, 
    passing_marks = EXCLUDED.passing_marks;

-- Insert questions for Java Programming (Exam ID: 1)
INSERT INTO questions (id, exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES
(1, 1, 'Which keyword is used to inherit a class in Java?', 'extends', 'implements', 'inherits', 'super', 'A', 2),
(2, 1, 'Which of these cannot be used for a variable name in Java?', 'identifier & keyword', 'identifier', 'keyword', 'none of the mentioned', 'C', 2),
(3, 1, 'What is the default value of a local variable?', 'null', '0', 'Depends on the data type', 'Not assigned', 'D', 2),
(4, 1, 'Which concept of Java is achieved by combining methods and attribute into a class?', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction', 'A', 2),
(5, 1, 'What is the size of boolean variable?', '8 bit', '16 bit', '32 bit', 'depends on JVM', 'D', 2),
(6, 1, 'Which class is the superclass of all classes in Java?', 'java.lang.Class', 'java.lang.Object', 'java.util.Object', 'java.lang.System', 'B', 2),
(7, 1, 'What is meant by the classes and objects that dependents on each other?', 'Tight Coupling', 'Cohesion', 'Loose Coupling', 'None of the above', 'A', 2),
(8, 1, 'Which method must be implemented by all threads?', 'start()', 'stop()', 'run()', 'execute()', 'C', 2),
(9, 1, 'Which of the following is a marker interface?', 'Runnable', 'Remote', 'Readable', 'Result', 'B', 2),
(10, 1, 'Which of these access specifiers can be used for an interface?', 'public', 'protected', 'private', 'All of the mentioned', 'A', 2),
(11, 1, 'Which of these keywords is used to manually throw an exception?', 'try', 'finally', 'throw', 'catch', 'C', 2),
(12, 1, 'What does the JVM do?', 'Compiles Java code to bytecode', 'Executes bytecode', 'Formats code', 'Provides IDE tools', 'B', 2),
(13, 1, 'Which component is responsible to run java program?', 'JDK', 'JVM', 'JRE', 'JIT', 'C', 2),
(14, 1, 'Which of these packages contains the exception StackOverflow in Java?', 'java.io', 'java.system', 'java.lang', 'java.util', 'C', 2),
(15, 1, 'Which of the following is not an OOPS concept in Java?', 'Polymorphism', 'Inheritance', 'Compilation', 'Encapsulation', 'C', 2),
(16, 1, 'Which of the following is an unchecked exception?', 'IOException', 'SQLException', 'ClassNotFoundException', 'NullPointerException', 'D', 2),
(17, 1, 'Which collection class allows you to associate its elements with key values?', 'java.util.Map', 'java.util.List', 'java.util.Set', 'java.util.Collection', 'A', 2),
(18, 1, 'Which of these is used to define a block of code that handles exceptions?', 'catch', 'throw', 'throws', 'finally', 'A', 2),
(19, 1, 'How do you create a generic class?', 'class MyClass<T> { }', 'class MyClass[T] { }', 'class MyClass(T) { }', 'class MyClass: T { }', 'A', 2),
(20, 1, 'What is true about the final keyword?', 'A final method cannot be overridden', 'A final class cannot be inherited', 'A final variable cannot be reassigned', 'All of the above', 'D', 2),
(21, 1, 'Which is the correct way to create a String object?', 'String s = new String("text");', 'String s = "text";', 'Both A and B', 'None of the above', 'C', 2),
(22, 1, 'In which memory are String objects stored in Java?', 'Stack memory', 'String Constant Pool (Heap)', 'Registers', 'Native Method Stack', 'B', 2),
(23, 1, 'What is the return type of the hashCode() method in the Object class?', 'Object', 'int', 'long', 'void', 'B', 2),
(24, 1, 'Which design pattern is implemented by the java.lang.Runtime class?', 'Singleton', 'Factory', 'Observer', 'Decorator', 'A', 2),
(25, 1, 'What is synchronization in Java?', 'Linking multiple classes', 'Managing multiple threads', 'Controlling access to shared resources by multiple threads', 'None of the above', 'C', 2),
(26, 1, 'Which of these interfaces is not a part of Java Collections Framework?', 'List', 'Set', 'Map', 'SortedList', 'D', 2),
(27, 1, 'What is the purpose of the transient keyword?', 'To prevent a variable from being serialized', 'To make a variable static', 'To indicate a temporary class', 'To mark a method for JVM internal use', 'A', 2),
(28, 1, 'Which method is used to compare two Strings lexicographically in Java?', 'compareTo()', 'compare()', 'equals()', 'isEqual()', 'A', 2),
(29, 1, 'What is the process of defining more than one method in a class with the same name but different parameters?', 'Method Overriding', 'Method Overloading', 'Method Doubling', 'Method Copying', 'B', 2),
(30, 1, 'Which keyword is used to call a superclass constructor?', 'this', 'parent', 'super', 'extends', 'C', 2)
ON CONFLICT (id) DO UPDATE SET 
    exam_id = EXCLUDED.exam_id, question_text = EXCLUDED.question_text, option_a = EXCLUDED.option_a, 
    option_b = EXCLUDED.option_b, option_c = EXCLUDED.option_c, option_d = EXCLUDED.option_d, 
    correct_answer = EXCLUDED.correct_answer, marks = EXCLUDED.marks;

-- Insert questions for Cloud Computing (Exam ID: 2)
INSERT INTO questions (id, exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES
(31, 2, 'Which AWS service is used for Serverless computing?', 'EC2', 'Lambda', 'RDS', 'S3', 'B', 2),
(32, 2, 'What does IaaS stand for?', 'Internet as a Service', 'Infrastructure as a Solution', 'Information as a Service', 'Infrastructure as a Service', 'D', 2),
(33, 2, 'Which of the following is an example of PaaS?', 'AWS EC2', 'Google App Engine', 'Microsoft Office 365', 'Dropbox', 'B', 2),
(34, 2, 'What does Amazon S3 stand for?', 'Simple Storage Solution', 'Simple Storage Service', 'System Storage Service', 'Synchronous Storage Service', 'B', 2),
(35, 2, 'Which feature automatically distributes incoming application traffic across multiple targets?', 'Auto Scaling', 'Load Balancer', 'Route 53', 'CloudFront', 'B', 2),
(36, 2, 'In AWS, what is a Region?', 'A specific data center', 'A collection of Edge Locations', 'A physical location with multiple Availability Zones', 'A global CDN network', 'C', 2),
(37, 2, 'Which of these is a fully managed relational database service in AWS?', 'DynamoDB', 'RDS', 'ElastiCache', 'Redshift', 'B', 2),
(38, 2, 'What does SaaS stand for?', 'Storage as a Service', 'System as a Service', 'Software as a Service', 'Security as a Service', 'C', 2),
(39, 2, 'Which cloud characteristic refers to the ability to quickly scale resources up and down?', 'Elasticity', 'High Availability', 'Fault Tolerance', 'Disaster Recovery', 'A', 2),
(40, 2, 'What is the primary function of Amazon API Gateway?', 'Database management', 'To create, publish, maintain, and secure APIs', 'To host static websites', 'Virtual machine provisioning', 'B', 2),
(41, 2, 'Which service provides a virtual network dedicated to your AWS account?', 'VPC', 'Subnet', 'Direct Connect', 'VPN', 'A', 2),
(42, 2, 'What type of storage is Amazon EBS?', 'Object storage', 'File storage', 'Block storage', 'Archive storage', 'C', 2),
(43, 2, 'Which tool is used to automate infrastructure deployment in AWS?', 'AWS CloudFormation', 'AWS CloudTrail', 'AWS Config', 'AWS Macie', 'A', 2),
(44, 2, 'Which of these allows running Docker containers on AWS without managing servers?', 'EC2', 'EKS', 'Fargate', 'Elastic Beanstalk', 'C', 2),
(45, 2, 'What is the AWS service used for user identity and access management?', 'AWS WAF', 'AWS IAM', 'AWS Shield', 'Amazon Cognito', 'B', 2),
(46, 2, 'Which model represents a cloud environment shared by multiple organizations with common concerns?', 'Public Cloud', 'Private Cloud', 'Community Cloud', 'Hybrid Cloud', 'C', 2),
(47, 2, 'What is the purpose of Auto Scaling in cloud computing?', 'To automatically encrypt data', 'To automatically adjust compute resources based on demand', 'To automatically backup databases', 'To automatically balance billing', 'B', 2),
(48, 2, 'Which AWS service is commonly used as a CDN (Content Delivery Network)?', 'Amazon CloudFront', 'Amazon Route 53', 'Amazon S3', 'Amazon VPC', 'A', 2),
(49, 2, 'Which database paradigm does Amazon DynamoDB belong to?', 'Relational', 'Graph', 'Document/NoSQL', 'Time-series', 'C', 2),
(50, 2, 'What is Cloud Computing?', 'Storing data on local servers', 'Delivering computing services over the internet', 'Using personal computers for complex processing', 'Connecting physical hardware locally', 'B', 2),
(51, 2, 'What is the shared responsibility model in AWS?', 'AWS manages all security', 'The customer manages all security', 'Security responsibilities are shared between AWS and the customer', 'A third party manages security', 'C', 2),
(52, 2, 'Which of the following is considered a serverless database on AWS?', 'Amazon Aurora Serverless', 'Amazon EC2 Database', 'Amazon EBS', 'Amazon EFS', 'A', 2),
(53, 2, 'Which of these is NOT a core Cloud Computing deployment model?', 'Public', 'Private', 'Hybrid', 'Isolated', 'D', 2),
(54, 2, 'What acts as a barrier between a private network and the public internet in VPC?', 'Internet Gateway', 'NAT Gateway', 'Security Group', 'Network ACL', 'A', 2),
(55, 2, 'Which pricing model is heavily associated with cloud computing?', 'Capital Expenditure (CapEx)', 'Pay-as-you-go (OpEx)', 'Fixed Monthly Hardware Lease', 'One-time licensing', 'B', 2)
ON CONFLICT (id) DO UPDATE SET 
    exam_id = EXCLUDED.exam_id, question_text = EXCLUDED.question_text, option_a = EXCLUDED.option_a, 
    option_b = EXCLUDED.option_b, option_c = EXCLUDED.option_c, option_d = EXCLUDED.option_d, 
    correct_answer = EXCLUDED.correct_answer, marks = EXCLUDED.marks;

-- Insert questions for Cyber Security Fundamentals (Exam ID: 3)
INSERT INTO questions (id, exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks) VALUES
(56, 3, 'What does CIA stand for in security?', 'Confidentiality, Integrity, Availability', 'Central Intelligence Agency', 'Control, Integrity, Access', 'Confidentiality, Identity, Authorization', 'A', 2),
(57, 3, 'Which of the following is a symmetric encryption algorithm?', 'RSA', 'AES', 'ECC', 'Diffie-Hellman', 'B', 2),
(58, 3, 'What type of attack involves overwhelming a server with traffic?', 'Phishing', 'Man-in-the-Middle', 'DDoS', 'SQL Injection', 'C', 2),
(59, 3, 'What does SQL Injection target?', 'Network Routers', 'Web Application Databases', 'Operating Systems', 'Firewalls', 'B', 2),
(60, 3, 'Which protocol is used for secure communication over the internet?', 'HTTP', 'FTP', 'HTTPS', 'Telnet', 'C', 2),
(61, 3, 'What is the process of converting readable data into unreadable data?', 'Decryption', 'Hashing', 'Encryption', 'Encoding', 'C', 2),
(62, 3, 'Which of the following describes Phishing?', 'Intercepting network traffic', 'Overloading a web server', 'Tricking users into revealing sensitive information', 'Guessing passwords via brute force', 'C', 2),
(63, 3, 'What does a Firewall primarily do?', 'Scans for malware files', 'Monitors and controls incoming and outgoing network traffic', 'Encrypts user passwords', 'Backs up database servers', 'B', 2),
(64, 3, 'What is Authentication?', 'Determining if a user is allowed to access a resource', 'Verifying the identity of a user', 'Encrypting a message', 'Tracking user activity', 'B', 2),
(65, 3, 'What is Authorization?', 'Verifying the identity of a user', 'Determining what an authenticated user is allowed to do', 'Creating secure network tunnels', 'Logging network traffic', 'B', 2),
(66, 3, 'Which of the following is an example of multi-factor authentication (MFA)?', 'Using a complex password', 'Using a password and an SMS OTP', 'Changing passwords every 30 days', 'Using a password manager', 'B', 2),
(67, 3, 'What is the purpose of Hashing?', 'To encrypt data for later decryption', 'To ensure data integrity and detect modifications', 'To compress large files', 'To hide IP addresses', 'B', 2),
(68, 3, 'Which of these is a widely used cryptographic hash function?', 'AES', 'RSA', 'SHA-256', 'DES', 'C', 2),
(69, 3, 'What is a Zero-Day vulnerability?', 'A vulnerability that has been patched recently', 'A vulnerability known only to the software vendor', 'A vulnerability that is unknown to the vendor and has no patch', 'A vulnerability that is not exploitable', 'C', 2),
(70, 3, 'What is Malware?', 'Hardware used by hackers', 'A secure firewall', 'Malicious software designed to cause harm or steal data', 'A type of encryption', 'C', 2),
(71, 3, 'What is Ransomware?', 'Software that secretly monitors user activity', 'Malware that encrypts files and demands payment for the key', 'A virus that deletes system files', 'A tool used to crack passwords', 'B', 2),
(72, 3, 'What does VPN stand for?', 'Virtual Private Network', 'Visual Processing Node', 'Virtual Public Network', 'Variable Private Network', 'A', 2),
(73, 3, 'What is a Man-in-the-Middle (MitM) attack?', 'An attacker secretly intercepts and relays communications between two parties', 'An attacker guessing a password', 'An attacker sending spam emails', 'An attacker physically stealing a laptop', 'A', 2),
(74, 3, 'What is XSS (Cross-Site Scripting)?', 'An attack targeting database servers', 'An attack where malicious scripts are injected into trusted websites', 'An attack that overflows buffer memory', 'An attack that disables firewalls', 'B', 2),
(75, 3, 'Which of these is used to prove the authenticity of a digital document or message?', 'Digital Signature', 'Public Key', 'Hash Collision', 'Symmetric Key', 'A', 2),
(76, 3, 'What is the primary difference between IDS and IPS?', 'IDS only detects intrusions, while IPS can also prevent them', 'IDS prevents intrusions, while IPS only detects them', 'IDS is for software, IPS is for hardware', 'There is no difference', 'A', 2),
(77, 3, 'Which of the following best describes Social Engineering?', 'Exploiting hardware flaws', 'Manipulating people into performing actions or divulging confidential information', 'Injecting malicious SQL queries', 'Brute forcing encryption keys', 'B', 2),
(78, 3, 'What is a Botnet?', 'A network of private computers infected with malicious software and controlled as a group', 'A secure corporate network', 'A legitimate web crawler', 'A type of anti-virus software', 'A', 2),
(79, 3, 'Why is using public Wi-Fi without a VPN risky?', 'It drains battery faster', 'Data transmitted can be easily intercepted by others on the same network', 'It causes hardware damage', 'It uses more mobile data', 'B', 2),
(80, 3, 'What is Principle of Least Privilege (PoLP)?', 'Giving users access only to what they need to do their jobs', 'Giving users access to everything by default', 'Revoking all access for all users', 'Granting administrative rights to all developers', 'A', 2),
(81, 3, 'What is the role of a Penetration Tester?', 'To write secure code', 'To legally hack into a system to find and report vulnerabilities', 'To manage firewalls', 'To investigate cyber crimes after they happen', 'B', 2),
(82, 3, 'Which type of cryptography uses two different keys (Public and Private)?', 'Symmetric Cryptography', 'Asymmetric Cryptography', 'Hash Cryptography', 'Quantum Cryptography', 'B', 2),
(83, 3, 'What is a Trojan Horse in cyber security?', 'A self-replicating virus', 'Malware disguised as legitimate software', 'A firewall rule', 'A type of DDoS attack', 'B', 2),
(84, 3, 'What does MAC address stand for?', 'Machine Access Control', 'Media Access Control', 'Memory Access Code', 'Mandatory Access Control', 'B', 2),
(85, 3, 'What is a patch in software security?', 'A piece of software designed to update a computer program to fix vulnerabilities', 'A hacking tool', 'A physical cable connection', 'A type of malware', 'A', 2)
ON CONFLICT (id) DO UPDATE SET 
    exam_id = EXCLUDED.exam_id, question_text = EXCLUDED.question_text, option_a = EXCLUDED.option_a, 
    option_b = EXCLUDED.option_b, option_c = EXCLUDED.option_c, option_d = EXCLUDED.option_d, 
    correct_answer = EXCLUDED.correct_answer, marks = EXCLUDED.marks;

-- Reset sequence to avoid conflicts if new rows are inserted later
SELECT setval('exams_id_seq', (SELECT MAX(id) FROM exams));
SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));
