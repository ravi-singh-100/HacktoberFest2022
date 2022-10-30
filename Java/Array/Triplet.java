package Java.Array;

class Triplet {
 
    boolean findNumbers(int a[], int arr, int sum)
    {
        int l, r;
        for (int i = 0; i < arr - 2; i++) {
            for (int j = i + 1; j < arr - 1; j++) {
                for (int k = j + 1; k < arr; k++) {
                    if (a[i] + a[j] + a[k] == sum) {
                        System.out.print("Triplet is " + a[i] + ", " + a[j] + ", " + a[k]);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public static void main(String[] args)
    {
        Triplet triplet = new Triplet();
        int a[] = { 1, 4, 45, 6, 10, 8 };
        int sum = 22;
        int arr = a.length;
 
        triplet.findNumbers(a, arr, sum);
    }
}