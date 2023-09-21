# MySQL Misc

## Connecting to the MySQL Server Using Command Options

```
example:
mysql -umyaccount -pmypassword -h mysql.mydomain.com  -P6606 -D my_database

-h, --host=name     Connect to host.
-P, --port=#        Port number to use for connection
-u, --user=name     User for login if not current user.
-p, --password[=name] Password to use when connecting to server. If password is not given it's asked from the tty.
-D, --database=name Database to use.
```

## Command

* check the isolation level 

```
mysql> SELECT @@global.transaction_isolation,@@session.transaction_isolation,@@transaction_isolation;
+--------------------------------+---------------------------------+-------------------------+
| @@global.transaction_isolation | @@session.transaction_isolation | @@transaction_isolation |
+--------------------------------+---------------------------------+-------------------------+
| REPEATABLE-READ                | REPEATABLE-READ                 | REPEATABLE-READ         |
+--------------------------------+---------------------------------+-------------------------+
```

* change the isolation level in MySQL

```

SET [SESSION | GLOBAL] TRANSACTION ISOLATION LEVEL {READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE}
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED ;
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

```

* start/commit/rollback a transaction

```
START TRANSACTION;
-- Or
BEGIN;
COMMIT;
ROLLBACK;
```
