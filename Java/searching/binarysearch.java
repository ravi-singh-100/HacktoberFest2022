package Java.searching;

public class binarysearch {
    static void binarySearch(int b[], int Find)
{
    int l = 0, h = b.length - 1;
    while (h - l > 1) {
        int mid = (h + l) / 2;
        if (b[mid] < Find) {
            l = mid + 1;
        }
        else {
            h = mid;
        }
    }
    if (b[l] == Find) {
      System.out.println("Found At Index " + l );
    }
    else if (b[h] == Find) {
        System.out.println("Found At Index " + h );
    }
    else {
        System.out.println("Not Found" );
    }
}
   
   
    public static void main (String[] args) {
         
      int b[]={1, 3, 4, 5, 6};
    
    int Find = 1;
    binarySearch(b, Find);
    Find = 6;
    binarySearch(b, Find);
    Find = 10;
    binarySearch(b, Find);
    }
}
    
