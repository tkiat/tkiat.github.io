# Water Flow Animation

Assumptions
  - A node consists of a text at the left and valve at the right except the last node where the valve is absent
  - The capacity of text and valve is 100L and 20L
  - At the beginning, the water level is 80% of the total capacity

This means we have 80L and 16L water at text and valve containers respectively at the beginning.

Assume the navbar has 4 nodes. To move water from 1st node to 4th node, 4 steps are needed: 1. Drain water from the beginning node to the right node 2. Pass water through the 2nd node to the right 3. Pass water through the 3rd node to the right 4. Stop water at the 4th node. This is shown as the first row in the table below.

|Current Active Node #|Target Node #|Steps|
|:-:|:-:|:-|
|1|4|R-Drain -> R-Pass -> R-Pass -> R-Stop|
|2|3|R-Drain -> R-Stop|
|3|1|L-Stop <- L-Pass <- L-Drain|
|2|1|L-Stop <- L-Drain|

To animate the water flow, I put the rectangle behind each node occupying full width and height and move only along Y axis to mimic the water flow. This is probably not the most realistic animation but it is accceptable to my eye when it is fast enough. The tables below show the corresponding CSS animation for each step.

### R-Drain: Drain water from the beginning node to the right

|Water (L)|Valve (L)|Cumulative Flow (L)|Text Animation|Valve Animation|
|:-:|:-:|:-:|:-:|:-:|
|80 |16 |0  |0%{transform: translateY(20%);}  |0%{transform: translateY(20%);}|
|76 |20 |4  |-                                |4%{transform: translateY(0);}|
|0  |20 |80 |80%{transform: translateY(100%);}|80%{transform: translateY(0);}|
|0  |0  |100|x                                |100%{transform: translateY(-100%);}|

- Animation Duration Multiplier = 1
- Next Animation Delay Multiplier = 4/100

#### Explanation

- Step 1: the water level is 80L for text and 16L for valve as per assumption. This is implemented by shifting the highlighter by 20% to the bottom, hence "transform: translateY(20%);" for both text and valve.
- Step 2: since the valve is always at the right to the text, the water (going to the right) must flow up to the valve's top. The movement of the valve from 16L to 20L must be considered a keyframe for the valve but not for the text since it is somewhere between two text animation keyframes (80L constantly reduced to 0L). We use 4% in the code since the current cumulative water flow is 4L from the total of 100L.
- Step 3: the point at which the water in the text is empty must be marked as a keyframe. We use 100% in "transform: translateY(100%);" because the water flows downwards. This is also a keyframe for the valve since it is a joint between "constant water level" and "water gonna be drained".
- Step 4: the water is totally drained from the valve. We use -100% in "transform: translateY(-100%);" because the water flows upwards.

It is very important to note that the overall animation duration depends on the cumulative water flow at the end. The animation whose final value is 216L (such as R-Pass) must be set 2.16 times longer than the one with 100L (such as R-Drain). This animation (R-Drain) has the lowest final cumulative water flow among others at 100L, hence the Animation Duration Multiplier of 1. This means if we set the base animation duration (which is the same value for R-Drain, R-Pass, etc.) to 1 second. The actual CSS animation duration for R-Drain will be 1 * (Animation Duration Multiplier) = 1 * 1 = 1 second

When water reaches any end of a node, naturally it should immediately trigger the animation of the next node. What's why we always need to add delay to the next animation to make the flow continuous. For R-Drain, we have to wait until the water flow to the tip of the valve to trigger the next animation. At this point, the cumulative water flow is 4L out of 100L total, hence Next Animation Delay Multiplier of 4/100. The CSS animation delay is therefore (base animation duration) * (Animation Duration Multiplier) * (Next Animation Delay Multiplier) = 1 * 1 * (4 / 100) = 0.04 second

### R-Pass: Pass water through the intermediary node(s) (if any) to the right.

|Water (L)|Valve (L)|Cumulative Flow (L)|Text Animation|Valve Animation|
|:-:|:-:|:-:|:-:|:-:|
|0      |0 |0  |0%{transform: translateY(-100%);}   |0%{transform: translateY(100%);}|
|96(top)|0 |96 |-                                   |-|
|96     |0 |100|-                                   |46.3%{transform: translateY(100%);}|
|76     |20|120|-                                   |55.56%{transform: translateY(0);}|
|0      |20|196|90.74%{transform: translateY(100%);}|90.74%{transform: translateY(0);}|
|0      |0 |216|x                                   |100%{transform: translateY(-100%);}|

- Animation Duration Multiplier = 2.16
- Next Animation Delay Multiplier = 120/216

### R-Stop: Stop water at the destination node at the right.

|Water (L)|Valve (L)|Cumulative Flow (L)|Text Animation|Valve Animation|
|:-:|:-:|:-:|:-:|:-:|
|0      |0 |0  |0%{transform: translateY(-100%);}|0%{transform: translateY(100%);}|
|96(top)|0 |20 |-                                |-|
|96     |0 |96 |-                                |82.76%{transform: translateY(100%);}|
|80     |16|100|100%{transform: translateY(20%);}|100%{transform: translateY(20%);}|

- Animation Duration Multiplier = 1
- Next Animation Delay Multiplier = 0

Note: Being the last node in the flow, the Next Animation Delay Multiplier must be 0.

### L-Drain: Drain water from the beginning node to the left

|Water (L)|Valve (L)|Cumulative Flow (L)|Text Animation|Valve Animation|
|:-:|:-:|:-:|:-:|:-:|
|80     |0|0  |0%{transform: translateY(20%);}    |0%{transform: translateY(20%);}|
|96     |0|16 |-                                  |13.79%{transform: translateY(100%);}|
|96(top)|0|20 |-                                  |x|
|0      |0|116|100%{transform: translateY(-100%);}|x|

- Animation Duration Multiplier = 1.16
- Next Animation Delay Multiplier = 20/116

### L-Pass: Pass water through the intermediary node(s) (if any) to the left.

|Water (L)|Valve (L)|Cumulative Flow (L)|Text Animation|Valve Animation|
|:-:|:-:|:-:|:-:|:-:|
|0      |0 |0  |0%{transform: translateY(100%);}   |0%{transform: translateY(-100%);}|
|0      |20|20 |9.26%{transform: translateY(100%);}|9.26%{transform: translateY(0);}|
|76     |20|96 |-                                  |44.44%{transform: translateY(0);}|
|96     |0 |116|-                                  |53.7%{transform: translateY(100%);}|
|96(top)|0 |120|-                                  |x|
|0      |0 |216|100%{transform: translateY(-100%);}|x|

- Animation Duration Multiplier = 2.16
- Next Animation Delay Multiplier = 120/116

### L-Stop: Stop water at the destination node at the left.

|Water (L)|Valve (L)|Cumulative Flow (L)|Text Animation|Valve Animation|
|:-:|:-:|:-:|:-:|:-:|
|0 |0 |0  |0%{transform: translateY(100%);} |0%{transform: translateY(-100%);}|
|0 |20|20 |20%{transform: translateY(100%);}|20%{transform: translateY(0);}|
|76|20|96 |-                                |96%{transform: translateY(0);}|
|80|16|100|100%{transform: translateY(20%);}|100%{transform: translateY(20%);}|

- Animation Duration Multiplier = 1
- Next Animation Delay Multiplier = 0

Note
  - \- denotes skipping because it is somewhere between two keyframes and is not a keyframe itself
  - x denotes skipping because the animation already reaches the end
  - (top) denotes water above the ground that connects to the top
