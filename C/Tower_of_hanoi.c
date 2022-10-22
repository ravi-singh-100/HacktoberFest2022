#include <stdio.h>
#include <conio.h>
void hanoi(char,char,char,int);
void main()
{
	int num;
	clrscr();
	printf("\nENTER NUMBER OF DISKS: ");
	scanf("%d",&num);
	printf("\nTOWER OF HANOI FOR %d NUMBER OF DISKS:\n", num);
	hanoi('A','B','C',num);
	getch();
}
void hanoi(char from,char to,char other,int n)
{
	if(n<=0)
		printf("\nILLEGAL NUMBER OF DISKS");
	if(n==1)
		printf("\nMOVE DISK FROM %c TO %c",from,other);
	if(n>1)
	{
		hanoi(from,other,to,n-1);
		hanoi(from,to,other,1);
		hanoi(to,from,other,n-1);
	}
}

/*
Input
Enter Number of Disk: 3
Output
Move Disk From A to C
Move Disk From A to B
Move Disk From C to B
Move Disk From A to C
Move Disk From B to A
Move Disk From B to C
Move Disk From A to C
*/
