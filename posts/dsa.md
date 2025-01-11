---
title: Data Structures and Algorithms
date: "2024-12-18"
category: Technology
excerpt: Learn everything about Data Structures and Algorithms
coverImage: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
tags: ["Data Structures", "C++","Arrays"]
---

**What is DSA ?** : An efficient way to store and manipulate data
	
**Why DSA ?**
- Better problem solving
- Efficient memory management

Types of Data Structures
 - Arrays
 - Linked Lists
 - Stacks
 - Queues
 - Trees
 - Heaps

### Arrays
- A contiguous memory stored Data structure.
- Memory is contiguous meaning there are elements in the consecutive memory space. 


##### **Insertion**:
- They are done in the first and last position of the array.
- in cpp the arrays are dynamic by using 'vector'.

```cpp
//assume an array named arr
vector<int> arr = {1,3,5,7,9}
arr.push_back(11); 
// this will insert 11 to the last position of the array
		
```
#####  **Deletion**:
- To delete the last element in an dynamic array,

```
vector <int> arr = {1,2,3,4,5};
arr.pop_back();
// this will pop the last element out and only remaining elements exists in the array
		
```
#####  **Traversing**:
- To traverse through an array, just use a for loop to get through every index of the array.

```cpp
vector <int> arr = {1,2,3,4,5,6};
int n = arr.size();
for (int i = 0; i < n; i++){
	cout << arr << " "; 
		}
// this will loop through the array and prints the elements. 
		
```

 **Finding maximum element in an array**

- Check if the array is sorted, if not sort it for better result
- If the array is sorted, then check whether the next element in an array is greater than the previous element

```cpp
vector <int> arr = {1,2,3,4}
int n = arr.size();
int max = arr[0];

for(int i=1; i<n; i++){
	if(arr[i] > max) max = arr[i];
}
return max;
```
