def main():
    with open("hamstr.in") as hamster:
        lines = hamster.readlines()

    all_food = int(lines[0])
    print all_food
    hum_amount = int(lines[1])
    print hum_amount

    hamster_map = []
    for elem in lines[2:]:
        hamster_map.append(map(int, elem.split()))

    print hamster_map

    hamster_map.sort()
    print hamster_map

    hum_eat = []

    summary = count(hum_amount, hamster_map, hum_eat)

    while all_food < summary:
        hamster_map.remove(hamster_map[hum_amount - 1])
        hum_eat.remove(hum_eat[hum_amount - 1])
        hum_amount = hum_amount - 1

        del hum_eat[:]
        summary = count(hum_amount, hamster_map, hum_eat)

    print hum_amount


def count(hum_amount_def, hamster_map_def, hum_eat_def):
    summary = 0
    for i in range(hum_amount_def):
        form = hamster_map_def[i][0] + hamster_map_def[i][1] * (hum_amount_def - 1)
        hum_eat_def.append(form)
        summary = summary + form
    return summary


main()
