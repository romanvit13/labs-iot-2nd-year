# coding=utf-8
import sys


def main():
    input_filename = "ijones.in" if len(sys.argv) == 1 else sys.argv[1]
    output_filename = "ijones.out" if len(sys.argv) == 1 else sys.argv[2]

    width, height, words = read_input(input_filename)
    distinct_path_count = solve(width, height, words)
    write_output(output_filename, distinct_path_count)


def read_input(filename):
    with open(filename, "r") as input_file:
        grid = []
        width, height = [int(dimension) for dimension in input_file.readline().split()]
        for _ in range(0, height):
            grid.append(input_file.readline().strip())
        return width, height, grid


def solve(width, height, grid):
    # Всі можливі букви алфавіту в словник(1 буква = 1 ключ)
    distinct_paths_to_letter = {
        chr(char_code): 0
        for char_code in range(ord('a'), ord('z') + 1)
    }
    # Вирахування кількості успішних способів пройти коридор.
    previous_solutions = [0 for y in range(0, height)]
    current_solutions = [0 for y in range(0, height)]

    print previous_solutions
    print current_solutions

    # По висоті
    for y in range(0, height):
        current_solutions[y] = 1
        previous_solutions[y] = 1
        distinct_paths_to_letter[grid[y][0]] += 1
    print current_solutions
    print previous_solutions

    # Підрахунок шляху по ширині, можна перестрибувати
    for x in range(1, width):
        paths_for_letters_in_this_column = {
            chr(char_code): 0
            for char_code in range(ord('a'), ord('z') + 1)
        }

        for y in range(0, height):
            case1 = distinct_paths_to_letter[grid[y][x]]
            print distinct_paths_to_letter[grid[y][x]]
            # Якщо не співпадає з елеменами пройдених по висоті
            case2 = previous_solutions[y] if grid[y][x - 1] != grid[y][x] else 0
            # Підраховуємо по ширині
            current_solutions[y] = case1 + case2
            print

            # Коли ми закінчимо цей стовпець, ми оновимо поточні підсумки для кожної літери.
            paths_for_letters_in_this_column[grid[y][x]] += current_solutions[y]
            print 'path for letters in this column'
            print paths_for_letters_in_this_column[grid[y][x]]

        previous_solutions = current_solutions
        for letter in paths_for_letters_in_this_column:
            distinct_paths_to_letter[letter] += paths_for_letters_in_this_column[letter]

    if height > 1:
        distinct_path_count = current_solutions[0] + current_solutions[height - 1]
    else:
        distinct_path_count = current_solutions[0]

    return distinct_path_count


def write_output(filename, distinct_path_count):
    with open(filename, "w") as output_file:
        output_file.write("%d" % distinct_path_count)


main()