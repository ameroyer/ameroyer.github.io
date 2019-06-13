import matplotlib.colors as mc
import colorsys

## Associate colors to each dish category
cat_colors = {
    "asia": "xkcd:coral",
    "ethno food": "orange",
    "fish & seafood": "aqua",
    "home-style cooking": "red",
    "international": "xkcd:lavender",
    "mediterranean": "xkcd:azure",
    "pasta": "gold",
    "vegetarian": "xkcd:yellowgreen",
    "sweet dishes" : "xkcd:pink"
    }

fontname = 'Helvetica'


def lighten_color(color, amount=0.5):
    """
    Lightens the given color by multiplying (1-luminosity) by the given amount.
    Input can be matplotlib color string, hex string, or RGB tuple.
    Amounts in [0., 1.] will lighten the color
    Amounts in [1., 2.] will darken it

    Examples:
    >> lighten_color('g', 0.3)
    >> lighten_color('#F034A3', 0.6)
    >> lighten_color((.3,.55,.1), 0.5)
    """
    try:
        c = mc.cnames[color]
    except:
        c = color
    c = colorsys.rgb_to_hls(*mc.to_rgb(c))
    c = colorsys.hls_to_rgb(c[0], 1 - amount * (1 - c[1]), c[2])
    c = tuple([min(max(x, 0.), 1.) for x in c])
    return c
