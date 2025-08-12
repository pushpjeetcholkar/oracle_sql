-- Oracle Scott Schema Script
-- Classic sample database for Oracle SQL learning
-- Contains EMP, DEPT, BONUS, and SALGRADE tables

-- Create the EMP table
CREATE TABLE emp (
  empno NUMBER(4) PRIMARY KEY,
  ename VARCHAR2(10),
  job VARCHAR2(9),
  mgr NUMBER(4),
  hiredate DATE,
  sal NUMBER(7,2),
  comm NUMBER(7,2),
  deptno NUMBER(2)
);

-- Create the DEPT table
CREATE TABLE dept (
  deptno NUMBER(2) PRIMARY KEY,
  dname VARCHAR2(14),
  loc VARCHAR2(13)
);

-- Create the BONUS table
CREATE TABLE bonus (
  ename VARCHAR2(10),
  job VARCHAR2(9),
  sal NUMBER(7,2),
  comm NUMBER(7,2)
);

-- Create the SALGRADE table
CREATE TABLE salgrade (
  grade NUMBER(2) PRIMARY KEY,
  losal NUMBER(7,2),
  hisal NUMBER(7,2)
);

-- Insert data into the DEPT table
INSERT INTO dept (deptno, dname, loc)
VALUES (10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO dept (deptno, dname, loc)
VALUES (20, 'RESEARCH', 'DALLAS');
INSERT INTO dept (deptno, dname, loc)
VALUES (30, 'SALES', 'CHICAGO');
INSERT INTO dept (deptno, dname, loc)
VALUES (40, 'OPERATIONS', 'BOSTON');

-- Insert data into the EMP table
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7369, 'SMITH', 'CLERK', 7902, '17-DEC-80', 800, NULL, 20);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7499, 'ALLEN', 'SALESMAN', 7698, '20-FEB-81', 1600, 300, 30);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7521, 'WARD', 'SALESMAN', 7698, '22-FEB-81', 1250, 500, 30);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7566, 'JONES', 'MANAGER', 7839, '02-APR-81', 2975, NULL, 20);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7654, 'MARTIN', 'SALESMAN', 7698, '28-SEP-81', 1250, 1400, 30);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7698, 'BLAKE', 'MANAGER', 7839, '01-MAY-81', 2850, NULL, 30);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7782, 'CLARK', 'MANAGER', 7839, '09-JUN-81', 2450, NULL, 10);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7788, 'SCOTT', 'ANALYST', 7566, '19-APR-87', 3000, NULL, 20);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7839, 'KING', 'PRESIDENT', NULL, '17-NOV-81', 5000, NULL, 10);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7844, 'TURNER', 'SALESMAN', 7698, '08-SEP-81', 1500, 0, 30);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7876, 'ADAMS', 'CLERK', 7788, '23-MAY-87', 1100, NULL, 20);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7900, 'JAMES', 'CLERK', 7698, '03-DEC-81', 950, NULL, 30);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7902, 'FORD', 'ANALYST', 7566, '03-DEC-81', 3000, NULL, 20);
INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7934, 'MILLER', 'CLERK', 7782, '23-JAN-82', 1300, NULL, 10);

-- Insert data into the SALGRADE table
INSERT INTO salgrade (grade, losal, hisal) VALUES (1, 700, 1200);
INSERT INTO salgrade (grade, losal, hisal) VALUES (2, 1201, 1400);
INSERT INTO salgrade (grade, losal, hisal) VALUES (3, 1401, 2000);
INSERT INTO salgrade (grade, losal, hisal) VALUES (4, 2001, 3000);
INSERT INTO salgrade (grade, losal, hisal) VALUES (5, 3001, 9999);

-- Commit the changes
COMMIT;

-- Display table contents for verification
SELECT 'DEPT Table:' as info FROM dual;
SELECT * FROM dept ORDER BY deptno;

SELECT 'EMP Table:' as info FROM dual;
SELECT * FROM emp ORDER BY empno;

SELECT 'SALGRADE Table:' as info FROM dual;
SELECT * FROM salgrade ORDER BY grade;