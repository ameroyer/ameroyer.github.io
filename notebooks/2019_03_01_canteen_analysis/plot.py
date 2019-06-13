import pandas as pd
import styling
import numpy as np
from matplotlib import pyplot as plt
from collections import Counter


def capitalize(s):
    return ' '.join(x[0].upper() + x[1:] for x in s.split(' '))



### TODO
# finish price list
# Word cloud for each day
# Allergens
# most common soups
# frequency of each category option, also per day: histogram
def plot_average_prices(dishes, threshold=0.1):
    fig, ax = plt.subplots(1, 1)
    plt.ylim([4, 6])
    mean_prices = [(key, dishes.query('subcategory == "%s"' % key)['price'].mean())
                   for key in dishes.subcategory.unique() if isinstance(key, str)]
    mean_prices = sorted(mean_prices, key=lambda x: x[1])
    previous_m = 0
    for key, m in mean_prices:        
        if (m - previous_m) < threshold:
            offset += 0.35
        else:
            offset = 0
        color = styling.cat_colors[key]
        plt.text(offset, m, '%s (%.2f)' % (capitalize(key), m),
                 fontname=styling.fontname,
                 bbox={"boxstyle": "square,pad=0.6",
                       "facecolor": color,
                       "edgecolor": styling.lighten_color(color, 1.6)})
        previous_m = m
    plt.show()


def plot_menus_distributions(dishes):
    fig, axes = plt.subplots(3, 2)
    for i, day in enumerate(dishes.day.unique()):
        ax = axes[i // 2, i % 2]
        x = dishes.query('day == "%s"' % day)
        x = Counter(x.subcategory.values)
        keys = sorted(x.keys())        
        values = [x[k] for k in keys]
        ax.pie([x[k] for k in keys],
                explode=[0.1] * len(keys),
                colors=[styling.cat_colors[k] for k in keys],
                wedgeprops={"edgecolor":'#888888'})
        ax.axis("equal")
        ax.set_title(day)
    # legend last axis
    keys = dishes.subcategory.unique()
    axes[-1, -1].pie([0.] * len(keys), labels=keys,
                   colors=[styling.cat_colors[k] for k in keys])
    axes[-1, 1].legend()
    plt.show()
    

with open("sv_restaurant_data.csv", 'r') as f:
    data = pd.read_csv(f)
    dishes = data.query('category == "Menus"')

    #plot_average_prices(dishes)
    plot_menus_distributions(dishes)

    # Average dish values
    #veggies = data.query('category == "Menus" and subcategory == "vegetarian"')
    #print(veggies)
    #print(data.columns)
    #print(data.index)
    #print(data.iloc[0])
