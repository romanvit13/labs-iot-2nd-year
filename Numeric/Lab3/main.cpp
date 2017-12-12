#include <iostream>
#include <cmath>


using namespace std;

void fff(double *x, double *f) {
    f[0]=4*x[0]*x[0]+x[1]*x[1]-4;
    f[1]=x[0]-x[1]*x[1];
}

int main() {
    double x[2] = {0.5, 0.5}, x_old[2] = {0.5, 0.5}, x_older[2] = {0.1, 0.1}, J[2][2], f[2], x_[2], f_[2];
    double ee = 1e-8, h[2];
    bool cond_N;
    int n = 2;
    double INVERS[2][2], E[2][2];
    double V[2][2], C[2][2], P[2], X[2], Y[2]; //Метод Гауса
    //ініціалізація одиничної матриці Е
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            if (i == j) E[i][j] = 1; else E[i][j] = 0;

    //ітераційний процес методу Ньютона
    do {
        cond_N = false;
        for (int i = 0; i < n; i++)
            h[i] = x_older[i] - x_old[i];
       fff(x,f);
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) {
                for (int k = 0; k < n; k++)
                    x_[k] = x[k];
                x_[j] = x[j] + h[j];
                //fff(x_,f_);
                J[i][j] = (f_[i] - f[i]) / h[j];
            }

        //обертання матриці - початок
        for (int b = 0; b < n; b++) {
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++) {
                    V[i][j] = J[i][j];
                    P[i] = E[i][b];
                }
        }

        //Прямий хід
        for (int k = 0; k < n; k++) {
            Y[k] = P[k] / V[k][k];
            for (int i = k + 1; i < n; i++) {
                P[i] += -V[i][k] * Y[k];
                for (int j = k + 1; j < n; j++) {
                    C[k][j] = V[k][j] / V[k][k];
                    V[i][j] += -V[i][k] * C[k][j];
                }
            }

        }

        //Обернений хід
        X[n - 1] = Y[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            X[i] = 0;
            for (int j = i + 1; j < n; j++)
                X[i] += C[i][j] * X[j];
            X[i] = Y[i] - X[i];
        }

        //Присвоєння обчислених значень Х у стовпець оберн. матриці
        for (int i = 0; i < n; i++)
            INVERS[i][i] = X[i];

        for (int i = 0; i < n; i++) {
            cond_N = cond_N || fabs((x[i] - x_old[i]) / x[i] * 100) > ee;
            x_older[i] = x_old[i];
            x_old[i] = x[i];
        }
    } while (cond_N);


    for (int i = 0; i < n; i++)
        cout << x[i] << " ";
    cout << "Check:";
    f[0] = 4 * x[0] * x[0] + x[1] * x[1] - 1;
    f[1] = x[0] - x[1] * x[1];
    cout<<f[0]<<" "<<f[1];

    return 0;
}