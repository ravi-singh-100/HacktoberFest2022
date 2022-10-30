package Java.Array;

import java.util.Arrays;

public class median {
  
public static int getMedian(int ar1[], int ar2[], int n)
{
    int j = 0;
    int i = n - 1;
    while (ar1[i] > ar2[j] && j < n && i > -1)
    {
        int temp = ar1[i];
        ar1[i] = ar2[j];
        ar2[j] = temp;
        i--; j++;
    }
    Arrays.sort(ar1);
    Arrays.sort(ar2);
    return (ar1[n - 1] + ar2[0]) / 2;
}
 
public static void main (String[] args)
{
    int ar1[] = { 1, 12, 15, 26, 38 };
    int ar2[] = { 2, 13, 17, 30, 45 };
 
    int n1 = 5;
    int n2 = 5;
    if (n1 == n2)
    System.out.println("Median is "+ getMedian(ar1, ar2, n1));
    
}
}
