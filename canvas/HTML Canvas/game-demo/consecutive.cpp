#include<bits/stdc++.h>
using namespace std;
int main()
{
    int i,k,j,t,n;
    cin>>t;
    for(k=0;k<t;k++)
    {
        int f=1;
        cin>>n;
        int arr[n];
        for(j=0;j<n;j++)
        {
            cin>>arr[j];
        }
        while(i<n-1)
        {
            if(arr[i+1]-arr[i]==1)
                continue;
            else if(arr[i+1]-arr[i]==2)
            {
                if(i==0)
                {
                    if((i+2)!=n)
                    {
                    if(arr[i+2]-arr[i+1]==1)
                        arr[i]=arr[i]+1;
                    else
                    {
                        arr[i]=arr[i]+1;
                    }
                    }
                    else
                        break;
                }
                else 
                {
                    arr[i+1]=arr[i+1]-1;
                    i++;
                }
            }
            else if(arr[i+1]-arr[i]==3)
            {        
                arr[i+1]=arr[i+1]-1;
                arr[i]=arr[i]+1;
                i++;
            }
            else{
                f=0;
                break;
            }
            i++;
        }
        if(f==1)
            cout << "YES" << endl;
        else
            cout << "NO" << endl;
    }
    return 0;
}