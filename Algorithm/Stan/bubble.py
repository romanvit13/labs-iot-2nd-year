import timeit


def bubble_sort(input_array):
    exchanges = 0
    compares = 0
    swap = 0

    for i in range(len(input_array) - 1, 0, -1):
        compares += 1
        for j in range(i):
            compares += 1
            if input_array[j] > input_array[j + 1]:
                swap = 1
                exchanges += 1
                memory = input_array[j]
                input_array[j] = input_array[j + 1]
                input_array[j + 1] = memory
        if swap != 1:
            break

    info = ("Compares: " + str(compares) + " Exchanges: " + str(exchanges))
    return info


def main():
    my_file = open("file.txt", "r").read().split(" ")
    for i in range(len(my_file)):
        my_file[i] = int(my_file[i])

    start_time = timeit.default_timer()
    print "Unsorted"
    print my_file

    print "Sorted"
    print bubble_sort(my_file)
    print my_file

    print "Results:"
    print bubble_sort(my_file)
    print ("time of work: ") + str(timeit.default_timer() - start_time)


main()