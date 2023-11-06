# MySQL Locks

```
mysql> Select @@Version,@@innodb_version;
+-----------+------------------+
| @@Version | @@innodb_version |
+-----------+------------------+
| 8.1.0     | 8.1.0            |
+-----------+------------------+
1 row in set (0.00 sec)
```

the isolation in this document is 'Repeatable Read'

## Create Table

```
CREATE TABLE user_tab (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    province VARCHAR(255),
    city VARCHAR(255),
    user_rank INT,
    INDEX idx_age (age),
    INDEX idx_province_city (province, city),
    UNIQUE KEY idx_user_rank (user_rank)
);
```



## Init Data

```
mysql> select * from user_tab;
+----+-----------+------+------------+---------------+-----------+
| id | name      | age  | province   | city          | user_rank |
+----+-----------+------+------------+---------------+-----------+
|  1 | John      |   30 | California | Los Angeles   |         1 |
|  2 | Alice     |   25 | New York   | New York City |         2 |
|  3 | Bob       |   52 | Texas      | Houston       |         3 |
|  4 | Emma      |   28 | Florida    | Miami         |         4 |
|  5 | Michael   |   32 | Illinois   | Chicago       |         5 |
|  6 | Olivia    |   29 | California | San Francisco |         6 |
|  7 | William   |   40 | Texas      | Austin        |         7 |
|  8 | Sophia    |   27 | New York   | Buffalo       |         8 |
|  9 | James     |   31 | Florida    | Orlando       |        10 |
| 20 | Charlotte |   26 | Illinois   | Springfield   |        21 |
| 22 | Emily     |   24 | Texas      | Dallas        |       401 |
| 31 | David     |   42 | California | San Diego     |        31 |
| 42 | Emily     |   24 | Texas      | Dallas        |        41 |
+----+-----------+------+------------+---------------+-----------+
13 rows in set (0.00 sec)
```



## Primary Key

```
### transaction A

mysql> select * from user_tab where id in (20,22) for update;
+----+-----------+------+----------+-------------+-----------+
| id | name      | age  | province | city        | user_rank |
+----+-----------+------+----------+-------------+-----------+
| 20 | Charlotte |   26 | Illinois | Springfield |        21 |
| 22 | Emily     |   24 | Texas    | Dallas      |       401 |
+----+-----------+------+----------+-------------+-----------+
2 rows in set (0.01 sec)
# only two row lock,no gap lock
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+---------------+-----------+
| LOCK_TYPE | LOCK_MODE     | LOCK_DATA |
+-----------+---------------+-----------+
| TABLE     | IX            | NULL      |
| RECORD    | X,REC_NOT_GAP | 20        |
| RECORD    | X,REC_NOT_GAP | 22        |
+-----------+---------------+-----------+
3 rows in set (0.00 sec)
## no record 1000, the value 1000 is in the gap (42,supremum pseudo-record)
mysql> select * from user_tab where id in (20,22,1000) for update; 
+----+-----------+------+----------+-------------+-----------+
| id | name      | age  | province | city        | user_rank |
+----+-----------+------+----------+-------------+-----------+
| 20 | Charlotte |   26 | Illinois | Springfield |        21 |
| 22 | Emily     |   24 | Texas    | Dallas      |       401 |
+----+-----------+------+----------+-------------+-----------+
2 rows in set (0.00 sec)
# we got a next-key lock supremum pseudo-record, in other transaction,
# (500, 'Emily', 24, 'Texas', 'Dallas', 4001) , can not insert 
# (41, 'Emily', 24, 'Texas', 'Dallas', 4001) , can insert
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks; 
+-----------+---------------+------------------------+
| LOCK_TYPE | LOCK_MODE     | LOCK_DATA              |
+-----------+---------------+------------------------+
| TABLE     | IX            | NULL                   |
| RECORD    | X,REC_NOT_GAP | 20                     |
| RECORD    | X,REC_NOT_GAP | 22                     |
| RECORD    | X             | supremum pseudo-record |
+-----------+---------------+------------------------+
4 rows in set (0.01 sec)

mysql> select * from user_tab where id>9 and id<22 for update;
+----+-----------+------+----------+-------------+-----------+
| id | name      | age  | province | city        | user_rank |
+----+-----------+------+----------+-------------+-----------+
| 20 | Charlotte |   26 | Illinois | Springfield |        21 |
+----+-----------+------+----------+-------------+-----------+
1 row in set (0.00 sec)

mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+-----------+-----------+
| LOCK_TYPE | LOCK_MODE | LOCK_DATA |
+-----------+-----------+-----------+
| TABLE     | IX        | NULL      |
| RECORD    | X         | 20        |
| RECORD    | X,GAP     | 22        |
+-----------+-----------+-----------+
3 rows in set (0.01 sec)
mysql> select * from user_tab where id>=9 and id<22 for update;
+----+-----------+------+----------+-------------+-----------+
| id | name      | age  | province | city        | user_rank |
+----+-----------+------+----------+-------------+-----------+
|  9 | James     |   31 | Florida  | Orlando     |        10 |
| 20 | Charlotte |   26 | Illinois | Springfield |        21 |
+----+-----------+------+----------+-------------+-----------+
2 rows in set (0.00 sec)
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+---------------+-----------+
| LOCK_TYPE | LOCK_MODE     | LOCK_DATA |
+-----------+---------------+-----------+
| TABLE     | IX            | NULL      |
| RECORD    | X,REC_NOT_GAP | 9         |
| RECORD    | X             | 20        |
| RECORD    | X,GAP         | 22        |
+-----------+---------------+-----------+
4 rows in set (0.00 sec)
```



## Unique Index

the behavior of the unique index is similar to the primary key. But something is confusing

```
mysql> select * from user_tab where user_rank in (21,31) for update;
+----+-----------+------+------------+-------------+-----------+
| id | name      | age  | province   | city        | user_rank |
+----+-----------+------+------------+-------------+-----------+
| 20 | Charlotte |   26 | Illinois   | Springfield |        21 |
| 31 | David     |   42 | California | San Diego   |        31 |
+----+-----------+------+------------+-------------+-----------+
2 rows in set (0.00 sec)
select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+---------------+-----------+
| LOCK_TYPE | LOCK_MODE     | LOCK_DATA |
+-----------+---------------+-----------+
| TABLE     | IX            | NULL      |
| RECORD    | X,REC_NOT_GAP | 21, 20    |
| RECORD    | X,REC_NOT_GAP | 31, 31    |
| RECORD    | X,REC_NOT_GAP | 20        |
| RECORD    | X,REC_NOT_GAP | 31        |
+-----------+---------------+-----------+
5 rows in set (0.00 sec)
mysql> select * from user_tab where user_rank>19  and user_rank <30 for update;
+----+-----------+------+----------+-------------+-----------+
| id | name      | age  | province | city        | user_rank |
+----+-----------+------+----------+-------------+-----------+
| 20 | Charlotte |   26 | Illinois | Springfield |        21 |
+----+-----------+------+----------+-------------+-----------+
1 row in set (0.00 sec)
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+---------------+-----------+
| LOCK_TYPE | LOCK_MODE     | LOCK_DATA |
+-----------+---------------+-----------+
| TABLE     | IX            | NULL      |
| RECORD    | X             | 21, 20    |
| RECORD    | X             | 31, 31    |
| RECORD    | X,REC_NOT_GAP | 20        |
+-----------+---------------+-----------+
4 rows in set (0.00 sec)
```

something is confusing.

```
## lock range is (22,42),primary key
mysql> select * from user_tab where id >25 and id<40 for update;
+----+-------+------+------------+-----------+-----------+
| id | name  | age  | province   | city      | user_rank |
+----+-------+------+------------+-----------+-----------+
| 31 | David |   42 | California | San Diego |        31 |
+----+-------+------+------------+-----------+-----------+
1 row in set (0.00 sec)
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+-----------+-----------+
| LOCK_TYPE | LOCK_MODE | LOCK_DATA |
+-----------+-----------+-----------+
| TABLE     | IX        | NULL      |
| RECORD    | X         | 31        |
| RECORD    | X,GAP     | 42        |
+-----------+-----------+-----------+
3 rows in set (0.01 sec)
## lock range is (31,401],unique index, oh no!!!!!
mysql> select * from user_tab where user_rank >35 and user_rank<45 for update;
+----+-------+------+----------+--------+-----------+
| id | name  | age  | province | city   | user_rank |
+----+-------+------+----------+--------+-----------+
| 42 | Emily |   24 | Texas    | Dallas |        41 |
+----+-------+------+----------+--------+-----------+
1 row in set (0.01 sec)
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+---------------+-----------+
| LOCK_TYPE | LOCK_MODE     | LOCK_DATA |
+-----------+---------------+-----------+
| TABLE     | IX            | NULL      |
| RECORD    | X             | 41, 42    |
| RECORD    | X             | 401, 22   |
| RECORD    | X,REC_NOT_GAP | 42        |
+-----------+---------------+-----------+
4 rows in set (0.00 sec)
## lock range is (41,401), nice!
mysql> select * from user_tab where user_rank  = 50  for update;
Empty set (0.00 sec)
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+-----------+-----------+
| LOCK_TYPE | LOCK_MODE | LOCK_DATA |
+-----------+-----------+-----------+
| TABLE     | IX        | NULL      |
| RECORD    | X,GAP     | 401, 22   |
+-----------+-----------+-----------+
2 rows in set (0.00 sec)
## lock range is (41,401], oh,fuck!
mysql> select * from user_tab where user_rank >50 and user_rank<51 for update;
Empty set (0.00 sec)
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+-----------+-----------+
| LOCK_TYPE | LOCK_MODE | LOCK_DATA |
+-----------+-----------+-----------+
| TABLE     | IX        | NULL      |
| RECORD    | X,GAP     | 401, 22   |
| RECORD    | X         | 401, 22   |
+-----------+-----------+-----------+
3 rows in set (0.00 sec)

```

conclusions: I think there is a bug in locks for unique index.

## Normal Index

```
# I think the LOCK_MODE for (52, 3) should be X,GAP , but it is X, 
mysql> select * from user_tab where  age > 41 and age < 50 for update; 
+----+-------+------+------------+-----------+-----------+
| id | name  | age  | province   | city      | user_rank |
+----+-------+------+------------+-----------+-----------+
| 31 | David |   42 | California | San Diego |        31 |
+----+-------+------+------------+-----------+-----------+
1 row in set (0.00 sec)
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+---------------+-----------+
| LOCK_TYPE | LOCK_MODE     | LOCK_DATA |
+-----------+---------------+-----------+
| TABLE     | IX            | NULL      |
| RECORD    | X             | 52, 3     |
| RECORD    | X             | 42, 31    |
| RECORD    | X,REC_NOT_GAP | 31        |
+-----------+---------------+-----------+
4 rows in set (0.00 sec)

# however, this is right
mysql> select * from user_tab where  age = 42 for update;
+----+-------+------+------------+-----------+-----------+
| id | name  | age  | province   | city      | user_rank |
+----+-------+------+------------+-----------+-----------+
| 31 | David |   42 | California | San Diego |        31 |
+----+-------+------+------------+-----------+-----------+
1 row in set (0.00 sec)
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+---------------+-----------+
| LOCK_TYPE | LOCK_MODE     | LOCK_DATA |
+-----------+---------------+-----------+
| TABLE     | IX            | NULL      |
| RECORD    | X             | 42, 31    |
| RECORD    | X,REC_NOT_GAP | 31        |
| RECORD    | X,GAP         | 52, 3     |
+-----------+---------------+-----------+
4 rows in set (0.00 sec)
mysql> select * from user_tab where user_rank  = 50  for update;
Empty set (0.00 sec)

mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+-----------+-----------+
| LOCK_TYPE | LOCK_MODE | LOCK_DATA |
+-----------+-----------+-----------+
| TABLE     | IX        | NULL      |
| RECORD    | X,GAP     | 401, 22   |
+-----------+-----------+-----------+
2 rows in set (0.01 sec)

mysql> select * from user_tab where age >45 and age<47  for update;
Empty set (0.00 sec)

mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+-----------+-----------+
| LOCK_TYPE | LOCK_MODE | LOCK_DATA |
+-----------+-----------+-----------+
| TABLE     | IX        | NULL      |
| RECORD    | X         | 52, 3     |
+-----------+-----------+-----------+
2 rows in set (0.00 sec)
```





## Normal Fields (no index)

```
mysql> select * from user_tab for update;
+----+-----------+------+------------+---------------+-----------+
| id | name      | age  | province   | city          | user_rank |
+----+-----------+------+------------+---------------+-----------+
|  1 | John      |   30 | California | Los Angeles   |         1 |
|  2 | Alice     |   25 | New York   | New York City |         2 |
|  3 | Bob       |   52 | Texas      | Houston       |         3 |
|  4 | Emma      |   28 | Florida    | Miami         |         4 |
|  5 | Michael   |   32 | Illinois   | Chicago       |         5 |
|  6 | Olivia    |   29 | California | San Francisco |         6 |
|  7 | William   |   40 | Texas      | Austin        |         7 |
|  8 | Sophia    |   27 | New York   | Buffalo       |         8 |
|  9 | James     |   31 | Florida    | Orlando       |        10 |
| 20 | Charlotte |   26 | Illinois   | Springfield   |        21 |
| 22 | Emily     |   24 | Texas      | Dallas        |       401 |
| 31 | David     |   42 | California | San Diego     |        31 |
| 42 | Emily     |   24 | Texas      | Dallas        |        41 |
+----+-----------+------+------------+---------------+-----------+
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+-----------+------------------------+
| LOCK_TYPE | LOCK_MODE | LOCK_DATA              |
+-----------+-----------+------------------------+
| TABLE     | IX        | NULL                   |
| RECORD    | X         | supremum pseudo-record |
| RECORD    | X         | 1                      |
| RECORD    | X         | 2                      |
| RECORD    | X         | 3                      |
| RECORD    | X         | 4                      |
| RECORD    | X         | 5                      |
| RECORD    | X         | 6                      |
| RECORD    | X         | 7                      |
| RECORD    | X         | 8                      |
| RECORD    | X         | 9                      |
| RECORD    | X         | 20                     |
| RECORD    | X         | 31                     |
| RECORD    | X         | 42                     |
| RECORD    | X         | 22                     |
+-----------+-----------+------------------------+
15 rows in set (0.01 sec)
mysql> select * from user_tab where name='Alice' for update;
+----+-------+------+----------+---------------+-----------+
| id | name  | age  | province | city          | user_rank |
+----+-------+------+----------+---------------+-----------+
|  2 | Alice |   25 | New York | New York City |         2 |
+----+-------+------+----------+---------------+-----------+
1 row in set (0.00 sec)
mysql> select LOCK_TYPE,LOCK_MODE,LOCK_DATA from performance_schema.data_locks;
+-----------+-----------+------------------------+
| LOCK_TYPE | LOCK_MODE | LOCK_DATA              |
+-----------+-----------+------------------------+
| TABLE     | IX        | NULL                   |
| RECORD    | X         | supremum pseudo-record |
| RECORD    | X         | 1                      |
| RECORD    | X         | 2                      |
| RECORD    | X         | 3                      |
| RECORD    | X         | 4                      |
| RECORD    | X         | 5                      |
| RECORD    | X         | 6                      |
| RECORD    | X         | 7                      |
| RECORD    | X         | 8                      |
| RECORD    | X         | 9                      |
| RECORD    | X         | 20                     |
| RECORD    | X         | 31                     |
| RECORD    | X         | 42                     |
| RECORD    | X         | 22                     |
+-----------+-----------+------------------------+
15 rows in set (0.00 sec)
```


## Misc

* Gap Locks exist in the "Repeatable Read" and "Serializable" isolation levels in MySQL to prevent phantom reads and maintain data consistency.
* A next-key lock is a combination of a record lock on the index record and a gap lock on the gap before the index record.
* Gap locks in InnoDB are “purely inhibitive”, which means that their only purpose is to prevent other transactions from inserting to the gap. Gap locks can co-exist. A gap lock taken by one transaction does not prevent another transaction from taking a gap lock on the same gap. There is no difference between shared and exclusive gap locks. They do not conflict with each other, and they perform the same function.
* [the detail of performance_schema.data_locks](https://dev.mysql.com/doc/refman/8.0/en/performance-schema-data-locks-table.html)

* [InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)





