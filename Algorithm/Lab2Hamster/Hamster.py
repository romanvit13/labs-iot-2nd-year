def main():
    list_H = []
    list_G = []

    hamstr_in = open("hamstr.in")
    s = hamstr_in.readline()
    s = int(s)
    c = hamstr_in.readline()
    c = int(c)

    for i in range(c):
        line = hamstr_in.readline()
        list(line)
        list_H[i] = line[0]
        list_G[i] = line[1]
    print zip(list_H, list_G)


main()