---
layout: post
title:  "wonderwheel"
date:   2017-12-02 10:00:00 +0200
categories: visualization, data, html, css, python
thumb: /images/thumbs/wonderwheel.png
---



Wonderwheel is a small data visualization project for representing images color distributions.
 More specifically, an image is represented as <span class="keyword">three separate hue histograms</span> for visually black pixels, visually white pixel, and the rest (perceived color inormation).
Finally, I generate the histogram at different stages of blurriness of the image (in decreasing order) to obtain an animation, displayed with pure <span class="inline-code">HTML/CSS</span>. 

<link rel="stylesheet" href="/notebooks/2017_12_02_wonderwheel/html/image2.css">
<link rel="stylesheet" href="/notebooks/2017_12_02_wonderwheel/html/image3.css">

<div style="width:10%; float:right">
<table border="1" cellpadding="6" align="right">
<tr>
<td><a style="color:#5E412F" href="/notebooks/2017_12_02_wonderwheel/wonderwheel.ipynb">Download .ipynb notebook</a></td>
</tr>
</table>
</div>

<div style="width:444px; height:444px; position:relative; top:10px; left:0px; float:left">
    <img style="border-radius: 50%; border: 0; top: 122px; left:122px; height: 200px; width:200px; position:relative" src="/notebooks/2017_12_02_wonderwheel/images/image2.jpeg">
    
       <div class ="frame">
           <div class="bar" id="bar0_black"></div>
           <div class="bar" id="bar0_white"></div>
           <div class="bar" id="bar0_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar1_black"></div>
           <div class="bar" id="bar1_white"></div>
           <div class="bar" id="bar1_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar2_black"></div>
           <div class="bar" id="bar2_white"></div>
           <div class="bar" id="bar2_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar3_black"></div>
           <div class="bar" id="bar3_white"></div>
           <div class="bar" id="bar3_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar4_black"></div>
           <div class="bar" id="bar4_white"></div>
           <div class="bar" id="bar4_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar5_black"></div>
           <div class="bar" id="bar5_white"></div>
           <div class="bar" id="bar5_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar6_black"></div>
           <div class="bar" id="bar6_white"></div>
           <div class="bar" id="bar6_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar7_black"></div>
           <div class="bar" id="bar7_white"></div>
           <div class="bar" id="bar7_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar8_black"></div>
           <div class="bar" id="bar8_white"></div>
           <div class="bar" id="bar8_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar9_black"></div>
           <div class="bar" id="bar9_white"></div>
           <div class="bar" id="bar9_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar10_black"></div>
           <div class="bar" id="bar10_white"></div>
           <div class="bar" id="bar10_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar11_black"></div>
           <div class="bar" id="bar11_white"></div>
           <div class="bar" id="bar11_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar12_black"></div>
           <div class="bar" id="bar12_white"></div>
           <div class="bar" id="bar12_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar13_black"></div>
           <div class="bar" id="bar13_white"></div>
           <div class="bar" id="bar13_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar14_black"></div>
           <div class="bar" id="bar14_white"></div>
           <div class="bar" id="bar14_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar15_black"></div>
           <div class="bar" id="bar15_white"></div>
           <div class="bar" id="bar15_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar16_black"></div>
           <div class="bar" id="bar16_white"></div>
           <div class="bar" id="bar16_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar17_black"></div>
           <div class="bar" id="bar17_white"></div>
           <div class="bar" id="bar17_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar18_black"></div>
           <div class="bar" id="bar18_white"></div>
           <div class="bar" id="bar18_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar19_black"></div>
           <div class="bar" id="bar19_white"></div>
           <div class="bar" id="bar19_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar20_black"></div>
           <div class="bar" id="bar20_white"></div>
           <div class="bar" id="bar20_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar21_black"></div>
           <div class="bar" id="bar21_white"></div>
           <div class="bar" id="bar21_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar22_black"></div>
           <div class="bar" id="bar22_white"></div>
           <div class="bar" id="bar22_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar23_black"></div>
           <div class="bar" id="bar23_white"></div>
           <div class="bar" id="bar23_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar24_black"></div>
           <div class="bar" id="bar24_white"></div>
           <div class="bar" id="bar24_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar25_black"></div>
           <div class="bar" id="bar25_white"></div>
           <div class="bar" id="bar25_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar26_black"></div>
           <div class="bar" id="bar26_white"></div>
           <div class="bar" id="bar26_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar27_black"></div>
           <div class="bar" id="bar27_white"></div>
           <div class="bar" id="bar27_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar28_black"></div>
           <div class="bar" id="bar28_white"></div>
           <div class="bar" id="bar28_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar29_black"></div>
           <div class="bar" id="bar29_white"></div>
           <div class="bar" id="bar29_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar30_black"></div>
           <div class="bar" id="bar30_white"></div>
           <div class="bar" id="bar30_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar31_black"></div>
           <div class="bar" id="bar31_white"></div>
           <div class="bar" id="bar31_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar32_black"></div>
           <div class="bar" id="bar32_white"></div>
           <div class="bar" id="bar32_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar33_black"></div>
           <div class="bar" id="bar33_white"></div>
           <div class="bar" id="bar33_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar34_black"></div>
           <div class="bar" id="bar34_white"></div>
           <div class="bar" id="bar34_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar35_black"></div>
           <div class="bar" id="bar35_white"></div>
           <div class="bar" id="bar35_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar36_black"></div>
           <div class="bar" id="bar36_white"></div>
           <div class="bar" id="bar36_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar37_black"></div>
           <div class="bar" id="bar37_white"></div>
           <div class="bar" id="bar37_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar38_black"></div>
           <div class="bar" id="bar38_white"></div>
           <div class="bar" id="bar38_color"></div>
       </div>

       <div class ="frame">
           <div class="bar" id="bar39_black"></div>
           <div class="bar" id="bar39_white"></div>
           <div class="bar" id="bar39_color"></div>
       </div>
</div>


<div style="width:444px; height:444px; margin-bottom:25px; margin-left:50%; top:10px; position:relative">
    <img style="border-radius: 50%; border: 0; top: 122px; left:122px; height: 200px; width:200px; position:relative" src="/notebooks/2017_12_02_wonderwheel/images/image3.jpeg">
    
<div class ="frame">
   <div class="bar2_" id="bar2_0_black"></div>
   <div class="bar2_" id="bar2_0_white"></div>
   <div class="bar2_" id="bar2_0_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_1_black"></div>
   <div class="bar2_" id="bar2_1_white"></div>
   <div class="bar2_" id="bar2_1_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_2_black"></div>
   <div class="bar2_" id="bar2_2_white"></div>
   <div class="bar2_" id="bar2_2_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_3_black"></div>
   <div class="bar2_" id="bar2_3_white"></div>
   <div class="bar2_" id="bar2_3_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_4_black"></div>
   <div class="bar2_" id="bar2_4_white"></div>
   <div class="bar2_" id="bar2_4_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_5_black"></div>
   <div class="bar2_" id="bar2_5_white"></div>
   <div class="bar2_" id="bar2_5_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_6_black"></div>
   <div class="bar2_" id="bar2_6_white"></div>
   <div class="bar2_" id="bar2_6_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_7_black"></div>
   <div class="bar2_" id="bar2_7_white"></div>
   <div class="bar2_" id="bar2_7_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_8_black"></div>
   <div class="bar2_" id="bar2_8_white"></div>
   <div class="bar2_" id="bar2_8_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_9_black"></div>
   <div class="bar2_" id="bar2_9_white"></div>
   <div class="bar2_" id="bar2_9_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_10_black"></div>
   <div class="bar2_" id="bar2_10_white"></div>
   <div class="bar2_" id="bar2_10_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_11_black"></div>
   <div class="bar2_" id="bar2_11_white"></div>
   <div class="bar2_" id="bar2_11_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_12_black"></div>
   <div class="bar2_" id="bar2_12_white"></div>
   <div class="bar2_" id="bar2_12_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_13_black"></div>
   <div class="bar2_" id="bar2_13_white"></div>
   <div class="bar2_" id="bar2_13_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_14_black"></div>
   <div class="bar2_" id="bar2_14_white"></div>
   <div class="bar2_" id="bar2_14_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_15_black"></div>
   <div class="bar2_" id="bar2_15_white"></div>
   <div class="bar2_" id="bar2_15_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_16_black"></div>
   <div class="bar2_" id="bar2_16_white"></div>
   <div class="bar2_" id="bar2_16_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_17_black"></div>
   <div class="bar2_" id="bar2_17_white"></div>
   <div class="bar2_" id="bar2_17_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_18_black"></div>
   <div class="bar2_" id="bar2_18_white"></div>
   <div class="bar2_" id="bar2_18_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_19_black"></div>
   <div class="bar2_" id="bar2_19_white"></div>
   <div class="bar2_" id="bar2_19_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_20_black"></div>
   <div class="bar2_" id="bar2_20_white"></div>
   <div class="bar2_" id="bar2_20_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_21_black"></div>
   <div class="bar2_" id="bar2_21_white"></div>
   <div class="bar2_" id="bar2_21_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_22_black"></div>
   <div class="bar2_" id="bar2_22_white"></div>
   <div class="bar2_" id="bar2_22_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_23_black"></div>
   <div class="bar2_" id="bar2_23_white"></div>
   <div class="bar2_" id="bar2_23_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_24_black"></div>
   <div class="bar2_" id="bar2_24_white"></div>
   <div class="bar2_" id="bar2_24_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_25_black"></div>
   <div class="bar2_" id="bar2_25_white"></div>
   <div class="bar2_" id="bar2_25_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_26_black"></div>
   <div class="bar2_" id="bar2_26_white"></div>
   <div class="bar2_" id="bar2_26_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_27_black"></div>
   <div class="bar2_" id="bar2_27_white"></div>
   <div class="bar2_" id="bar2_27_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_28_black"></div>
   <div class="bar2_" id="bar2_28_white"></div>
   <div class="bar2_" id="bar2_28_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_29_black"></div>
   <div class="bar2_" id="bar2_29_white"></div>
   <div class="bar2_" id="bar2_29_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_30_black"></div>
   <div class="bar2_" id="bar2_30_white"></div>
   <div class="bar2_" id="bar2_30_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_31_black"></div>
   <div class="bar2_" id="bar2_31_white"></div>
   <div class="bar2_" id="bar2_31_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_32_black"></div>
   <div class="bar2_" id="bar2_32_white"></div>
   <div class="bar2_" id="bar2_32_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_33_black"></div>
   <div class="bar2_" id="bar2_33_white"></div>
   <div class="bar2_" id="bar2_33_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_34_black"></div>
   <div class="bar2_" id="bar2_34_white"></div>
   <div class="bar2_" id="bar2_34_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_35_black"></div>
   <div class="bar2_" id="bar2_35_white"></div>
   <div class="bar2_" id="bar2_35_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_36_black"></div>
   <div class="bar2_" id="bar2_36_white"></div>
   <div class="bar2_" id="bar2_36_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_37_black"></div>
   <div class="bar2_" id="bar2_37_white"></div>
   <div class="bar2_" id="bar2_37_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_38_black"></div>
   <div class="bar2_" id="bar2_38_white"></div>
   <div class="bar2_" id="bar2_38_color"></div>
</div>

<div class ="frame">
   <div class="bar2_" id="bar2_39_black"></div>
   <div class="bar2_" id="bar2_39_white"></div>
   <div class="bar2_" id="bar2_39_color"></div>
</div>
</div>



### <i class="fa fa-wrench"></i> Computing the histograms
The first step is to extract black, white and color pixels from the image. I first map the input image to the HSV (Hue Saturation Value) domain.

```python
hue, sat, val = np.split(colors.rgb_to_hsv(image / 255.), 3, axis=-1)
```

I then extract black (resp. white) pixels as pixels whose value is below (resp. above) a certain threhsold

```python
black_values = np.where(val < black_value_threshold)

hue_bins = np.linspace(0.0, 1.0, num_bins + 1, endpoint=True)
mask = sat[black_values]
black_hist, _ = np.histogram(hue, bins=hue_bins, weights=mask)
black_hist[np.isnan(black_hist)] = 0.
```

 The remaining pixels will be used to compute the hue histograms. Each hue is additionally weighted by its *saturation*, so that low saturation colors, i.e. gray. get smaller weights, and an *originality factor*, which is defined as how far the color is from the average hue in the image.


```python
hue[white_values] = -1
hue[black_values] = -1
weights = sat**sat_weight * np.abs(hue - np.mean(hue[hue >= 0])) 
hue_hist, _ = np.histogram(hue, bins=hue_bins, weights=weights)
```


And the color of the histogram bar should take into account the average saturation and value for this specific hue in the image.

```python
data['colors'] = []
for i, bin_center in enumerate(hue_bins):
index = np.where((hue > bin_center  - bins_offset) & 
                 (hue < bin_center + bins_offset))
color = colorsys.hsv_to_rgb(bin_center,
			    np.mean(sat[index]), 
			    np.mean(val[index]))
data['colors'].append(color)
```


<div style="text-align:center">
	<img src="/notebooks/2017_12_02_wonderwheel/matprotlib_preview.png">
</div>



### <i class="fa fa-paint-brush"></i> Visualization
Finally, I added a small animation component for the visualization. 

First I generate a color histogram for a given image  at different stage of bluriness (Gaussian filter with decreasing variance); The intuition is that the most important or salient colors will be present at a high-level while details will start appearing at fine-grained reoslution.

```python
resolutions = np.linspace(40., 0., num_resolutions, endpoint=True)
for r in resolutions:
img = ndimage.gaussian_filter(image, sigma=r)
aux = create_equalizer(img, num_bins=num_bins)
data = np.concatenate([data, aux])
```
 
And finally, the animation is created by representing each bar as a rectangular div with transition animation.

```python               
# Define bar template
bar_template = """
#{name} {
left: {pos_left}px;
top: {pos_top}px;
background-color: rgb({r}, {g}, {b});
-webkit-animation: {name}_anim {duration}s ease-out infinite ; 
animation: {name}_anim {duration}s ease-out infinite;
-ms-transform: rotate({rot}deg); /* IE 9 */
-webkit-transform: rotate({rot}deg); /* Safari */
transform: rotate({rot}deg);
-webkit-transform-origin: 50% 0%;
-moz-transform-origin: 50% 0%;
-o-transform-origin: 50% 0%;
transform-origin: 50% 0%;
border: {border_width}px solid {border_color};
}
"""

# Define bar animation
def write_anim(name, heights, colors=None):
assert len(times) == len(heights)
template = ""
start = 'from'
if colors is None:
    for i in range(len(times)):
        template += "%d%% {height: %dpx;}\n" % (times[i], int(heights[i]))
else:
    for i in range(len(times)):
        template += "%d%% {height: %dpx; background:rgb(%d, %d, %d)}\n" % (
            times[i], int(heights[i]), colors[i][0], colors[i][1], colors[i][2])
template =  """       
@-webkit-keyframes
{name}_anim {
    {content}
}
""".format(name=name, content=template)
return template
```

