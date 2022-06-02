# Project

Audditec is a project dedicated to the audit of public entities to ensure the good use of public resources. Within all the different areas of public administration the focus of the project is the conservation of green areas, to make sure that parks are maintained by contractors as they are obliged to.

# Description

Map

- A map pointing to trees should be placed. The map uses coordinates to point out the location of each tree. Each tree will be represented by a round marker with a color depending on the current grade held by a tree. This is handled in the front-end when the information is retrieved from the backend. Every tree will have a popup on tap to show an overview of the last entry.

- Every tree should have its own section accessible from the popup. When accessing it throug the web the tree section will show its history and evolution over time. Using 3rd party Graphic libraries graphics will show the overtime development. When in mobile, the same section will hide the overtime history and will instead show a form to place a new entry and picture. 

- In the same screen/area where the map is one can add new entries with the following data:
-  Country
-  Region
-  Municipality
-  Park 
-  Picture
-  Notes (optional)
-  Timestamp**
-  Latitude**
-  Longitude**

** The user won't see the timestamps

Control center

- The control center will allow to filter the results according to the data already provided in the previous section. Basically time-range and area. This will be done by filtering from the backend. 
