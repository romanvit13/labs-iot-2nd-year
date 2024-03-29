// ConsoleApplication2.cpp: определяет точку входа для консольного приложения.
//

#include "stdafx.h"
#include <math.h>
#include <iostream>
using namespace::std;

//Main function.
int main() {
	int n = 3;
	bool condition;
	//Error measurement.
	double dd, ee = 0.001;
	double
		A[3][3] = { { 24.21, 0.2, 1.2 },{ 2.31, 31.49, 1.52 },{ 3.49, 4.84, 28.72 } };
	double
		B[3] = { 30.24, 40.95, 1.42 };
	double V[3][3], P[3], X[3], Y[3];
	for (int i = 0; i < n; i++)
		X[i] = Y[i] = B[i];

	for (int i = 0; i<n; i++)
		for (int j = 0; j<n; j++)
			if (i != j)
			{
				P[i] = B[i] / A[i][i];
				V[i][j] = -A[i][j] / A[i][i];
			}
			else
				V[i][j] = 0;

	do
	{
		condition = false;
		for (int i = 0; i < n; i++)
		{
			dd = 0;
			for (int j = 0; j < n; j++)
				dd += V[i][j] * X[j];
			X[i] = P[i] + dd;

		}

		for (int i = 0; i < n; i++)
		{
			condition = condition || fabs((X[i] - Y[i]) / X[i] * 100) > ee;
			Y[i] = X[i];
		}
	} while (condition);

	//Checking.
	cout << "Solving of system X[]:" << endl;
	for (int i = 0; i < n; i++)
		cout << X[i] << " ";
	cout << endl;

	cout << "Check of output B[]:" << endl;
	for (int i = 0; i < n; i++)
		cout << B[i] << " ";

	cout << endl;
	cout << "Check output sum.A[][j]*X[j]:" << endl;
	for (int i = 0; i < n; i++)
		cout << A[i][0] * X[0] + A[i][1] * X[1] + A[i][2] * X[2] << " ";

	int x;
	cin >> x;
	return 0;
}

