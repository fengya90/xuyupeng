# Python Quick Reference Manual

## Data Structure

### List

```python
list1 = []
list2 = list()
list3 = ["a", "b", "c", "d"]
list4 = ['ab', 'cd', 1997, 2000]
print(list4[0])
print( list4[-1] )
print(list4[0:4])
list4[2] = 2001
list4.append('Baidu')
print(list4)
del list4[2]
print(list4)
print(len(list2))
print(list3+list4)
print(['Hi!'] * 4)
print(3 in [1, 2, 3])
for x in [1, 2, 3]:
     print(x, end=" ")
print(len(list4))
print(max(list4))
print(min(list4))
```

functions

```python
list.append(obj)
list.count(obj)
list.extend(seq)
list.index(x[, start[, end]])
list1 = ['Google', 'Abc', 'Taobao']
print ('Runoob Index:', list1.index('Abc'))
print ('Taobao Index:', list1.index('Taobao'))
list.sort(cmp=None, key=None, reverse=False)
data = [("B", 5, "20"), ("A", 1, "5"), ("C", 6, "10")]
data.sort(key=lambda x: x[0],reverse=True)
print(data)
def takeSecond(elem):
    return elem[1]
random = [(2, 2), (3, 4), (4, 1), (1, 3)]
random.sort(key=takeSecond) 
```

## Misc

### Random

```python
import random

random.random() #[0,1)
random.randint(1,10) # [1,10]


```