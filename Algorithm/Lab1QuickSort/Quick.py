import time

quicksort_exchanges = 0
quicksort_compares = 0


def get_array():
    my_file = open("10000_input.txt", "r").read()
    example_list = [int(k) for k in my_file.split(' ')]
    return example_list


def quicksort(input_array, left, right):
    global quicksort_compares, quicksort_exchanges

    i = left
    j = right
    x = round((left + right) / 2, 1)
    x = int(x)
    pivot = input_array[x]

    while left < j or i < right:
        quicksort_compares = quicksort_compares + 1

        while input_array[i] <= pivot:
            quicksort_compares = quicksort_compares + 1
            i = i + 1

        while input_array[j] > pivot:
            quicksort_compares = quicksort_compares + 1
            j = j - 1

        quicksort_compares = quicksort_compares + 1

        if i <= j:
            quicksort_exchanges = quicksort_exchanges + 1
            input_array[i], input_array[j] = input_array[j], input_array[i]

            i = i + 1
            j = j - 1

        else:
            if left < j:
                quicksort_compares = quicksort_compares + 1
                quicksort(input_array, left, j)

            if i < right:
                quicksort_compares = quicksort_compares + 1
                quicksort(input_array, i, right)

            return


def main():
    quicksort_start_time = time.time()
    array = get_array()
    print array
    quicksort(array, 0, len(array) - 1)
    print array
    quicksort_time = time.time() - quicksort_start_time
    quicksort_time = round(quicksort_time, 5)
    print quicksort_time
    results = "Results: \n Compares: " + str(quicksort_compares) + " Exchanges: " + str(quicksort_exchanges) + \
              " Time: " + str(quicksort_time)
    print results


main()
