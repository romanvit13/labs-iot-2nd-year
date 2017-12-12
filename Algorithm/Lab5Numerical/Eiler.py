import math

from numpy import arange
import matplotlib.pyplot as plt

Umax = 100
f = 50
R1 = 5
R2 = 4
R3 = 7
R4 = 2
U1 = 0.1
C1 = 300 * math.pow(10, -6)
C2 = 150 * math.pow(10, -6)
T = 0.2
h = 0.0001
Y = [0] * 3
X = [0] * 3


def func1(par1, par2):
    return (par2 * R1 + U1 + par1) / 2 * R2 * C1


def func2(par1, par2):
    return (2 * par2 * R2 - par2 * R1 - U1 - par1) / R1 * C2


def func3(par2, par3):
    return (2 * par2 * R2 - 2 * par2 * R1 - U1 - par3) / R1


if __name__ == '__main__':
    for t in arange(0, (T - h / 2), h):
        U1 = Umax * math.sin(2 * math.pi * f * t)

        X[0] = Y[0] + h * func1(Y[0], Y[1])
        X[1] = Y[1] + h * func2(Y[0], Y[1])
        X[2] = Y[2] + h * func3(Y[0], Y[1])

        X0 = func1(Y[0], Y[1])
        X1 = func1(X[0], X[1])
        X[0] = Y[0] + 0.5 * h * (X0 + X1)

        X0 = func2(Y[0], Y[1])
        X1 = func2(X[0], X[1])
        X[1] = Y[1] + 0.5 * h * (X0 + X1)

        X0 = func3(Y[0], Y[1])
        X1 = func3(X[0], X[1])
        X[2] = Y[2] + 0.5 * h * (X0 + X1)

        Y[0] = X[0]
        Y[1] = X[1]
        Y[2] = X[2]
        U2 = X[2] * R1
        print(str(U2) + '\t' + str(t))
        plt.plot(t + h, U2, 'ro')

    plt.xlabel(r'$t$')
    plt.ylabel(r'$U2$')
    plt.grid(True)
    plt.show()
