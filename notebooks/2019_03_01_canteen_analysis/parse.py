import os
import re
import pandas as pd
from collections import Counter
from nltk.corpus import wordnet as wn
adj_exceptions = ['gratinated', 'indian', 'greek']

def is_adjective(expr):
    """Determines whether a string contains only adjectives"""
    global adj_exceptions
    for word in expr.split():
        s = wn.synsets(word)        
        if (len(s) == 0 or s[0].pos() == 'n') and word not in adj_exceptions:
            return False
    return True


def correct(s):
    """Minor manual replacements"""
    return s.replace(
        ',', " and").replace(
        '-', ' ').replace(        
        '&', "and").replace(
        "garnish", '').replace(
        "bell pepper", "bellpepper").replace(
        "or ", '')

def parse_name(s):
    """Parse a string into sub-expression corresponding to dishes"""
    parsed = re.split('/|with|"|and', correct(s))
    parsed = [x.strip().lower() for x in parsed if len(x.strip())]
    items = []
    acc = ""
    for i, w in enumerate(parsed):
        if i < len(parsed) - 1 and is_adjective(w):
                acc += w + ' '
        else:
            items.append(acc + w)
            acc = ''
    return items

def get_schnitzel_names(df, csv=None):
    """Returns all the possible name variants of schnitzel"""
    schnitzel_names = df[(df["day"] == "Wednesday") & (df["subcategory"] == "home-style cooking")]
    schnitzel_names = schnitzel_names.name.map(lambda x: x[0])
    schnitzel_names = schnitzel_names.value_counts()
    if csv is None:
        return schnitzel_names
    else:
        schnitzel_names = schnitzel_names.to_frame().reset_index()
        schnitzel_names.to_csv(csv, header=["name", "count"])

def get_average_prices(df):
    mains = df[df["category"] == "Menus"]
    for v in mains.subcategory.unique():
        prices = df[df["subcategory"] == v].price
        avg = prices.mean()
        print(v, avg)
                
def get_frequencies(df, day=None):
    mains = df[df["category"] == "Menus"]
    if day is None:
        return df.subcategory.value_counts()
    else:
        return df[df["day"] == day].subcategory.value_counts()
        
def workcloud(df, day=None):
    words = list(df.name)
    words = [y for l in words for x in l for y in x.replace("of", '').replace("sauce", '').split()]
    counts = Counter(words)
    if day is None:
        return counts
    else:
        words = list(df[df["day"] == day].name)
        #words = [x for l in words for x in l]
        words = [y for l in words for x in l for y in x.replace("of", '').replace("sauce", '').split()]
        ncounts = Counter(words)
        total = sum(counts.values(), 0.0)
        for key in counts:
            counts[key] /= total
        total = sum(ncounts.values(), 0.0)
        for key in ncounts:
            ncounts[key] /= total
        ncounts.subtract(counts)
        return ncounts


if __name__ == "__main__":
    target_path = "idyll-sources/data"
    source_path = "./sv_restaurant_data.csv"
    
    df = pd.read_csv(source_path)
    df = df.apply(lambda x: [parse_name(y) for y in x] if x.name == 'name' else x)
    
    # Save schnitzel names
    get_schnitzel_names(df, csv=os.path.join(target_path, "schnitzel-names.csv"))