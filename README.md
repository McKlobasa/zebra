# zebra

Sortiranje districtov po prodaji znotraj districta, ali pa v določeni kategoriji je s klikom na ime districta oz. ime kategorije.

testirano z http-server https://www.npmjs.com/package/http-server na Chrome


navodila:


Use JavaScript (or TypeScript) and D3.js library to create "small multiples".

Wikipedia:
A small multiple (sometimes called trellis chart, lattice chart, grid chart, or panel chart) is a series of similar graphs or charts using the same scale and axes, allowing them to be easily compared.

In the attached files Multiples.png you can see the end result of how this should look like and in the Multiples.csv file is the underlying data for this exact case.

Here's how you could approach it, so that it might be a bit easier to get started:

1. Read the csv file using the d3's built in csv functions:
http://learnjsdata.com/read_data.html

2. You can then group the data using the group functions:
https://observablehq.com/@d3/d3-group

3. Display the charts. There's some gap between them so that they don't blend together.

4. As you can see the charts are scaled proportionately. The FD-01 data is much bigger than the LI-05 data, so they are shown in exact proportions. Once your charts are displayed you can now start playing with scaling them correctly.

5. For some bonus points you might even sort the charts. In the screenshots the charts are sorted by the row totals - that is if you sum up all elements across all the Districts you will see that the sum for the 020-Mens is the largest, followed by 050-Shoes,...

These are just suggestions, if you want to do it in a different way feel free to do so. Some of the articles might be targeting different versions of D3, so the exact syntax will depend on the version of D3 that you will use.

The exact sizes are not important, just pick some numbers for the widths and heights of the elements, but try to make sure that elements don't overlap.


After you are done please push your code to some online repository on GitHub or BitBucket and share it with us.
