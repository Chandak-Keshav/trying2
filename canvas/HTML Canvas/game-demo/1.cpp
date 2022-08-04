#include <iostream>
using namespace std;
void merge(int array[], int const left, int const mid, int const right)
{
	auto const subArrayOne = mid - left + 1;
	auto const subArrayTwo = right - mid;
	auto *leftArray = new int[subArrayOne],
		*rightArray = new int[subArrayTwo];
	for (auto i = 0; i < subArrayOne; i++)
		leftArray[i] = array[left + i];
	for (auto j = 0; j < subArrayTwo; j++)
		rightArray[j] = array[mid + 1 + j];

	auto One = 0, // Initial index of first sub-array
		Two = 0; // Initial index of second sub-array
	int index = left; // Initial index of merged array

	// Merge the temp arrays back into array[left..right]
	while (One < subArrayOne && Two < subArrayTwo) {
		if (leftArray[One] <= rightArray[Two]) {
			array[index] = leftArray[One];
			One++;
		}
		else {
			array[index] = rightArray[Two];
			Two++;
		}
		index++;
	}
	// Copy the remaining elements of
	// left[], if there are any
	while (One < subArrayOne) {
		array[index] = leftArray[One];
		One++;
		index++;
	}
	// Copy the remaining elements of
	// right[], if there are any
	while (Two < subArrayTwo) {
		array[index] = rightArray[Two];
		Two++;
		index++;
	}
}

void mergeSort(int array[], int const begin, int const end)
{
	if (begin >= end)
		return; // Returns recursively

	auto mid = begin + (end - begin) / 2;
	mergeSort(array, begin, mid);
	mergeSort(array, mid + 1, end);
	merge(array, begin, mid, end);
}
void gsort(int arr[],int n)
{
	int i,k=0,ans[n];
	for(i=0;i<(n+1)/2;i++)
	{
		ans[k++]=arr[i];//g-sort 
		ans[k++]=arr[n-i-1];
	}
	if(n%2==1)
		ans[k++]=arr[(n-1)/2];//done when the array has the size as odd
	for(i=0;i<n;i++)
		arr[i]=ans[i];//ans array is copied to arr array
}
void printArray(int A[], int size)
{
	for (auto i = 0; i < size; i++)
		cout << A[i] << " ";//printing the g-sorted array
}
int main()
{
	int n,i;
	cin>>n;//size of array
	int arr[n];
	for(i=0;i<n;i++)
		cin>>arr[i];//array is entered by the user
	mergeSort(arr, 0, n - 1);//sorting takes place here
	gsort(arr,n);//g-sort takes place here
	printArray(arr, n);//array printing takes place here
	return 0;
}

