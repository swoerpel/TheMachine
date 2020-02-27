how to add a new generator:

1. create config_[generator_name].js in config folder
2. create [generator_name].js in generators folder
   2b. create class -> constructor -> Initialize()
3. add <script> tag for each new file created
4. in ThePreview.js, add another if(type == [generator_name]) statement to the draw function
5. in ThePreview.js, create new function 'draw[Generator_name](tile)', copy drawAntColony(tile) 
6. in GridMaster.js, add another if(type == [generator_name]) statement to the InitializeGenerator function
7. in GridMaster.js, add another if(type == [generator_name]) statement to the InitializeParameters function
8. in GridMaster.js, create new function 'init_[generator_name]_params()', copy init_ant_colony_params();

how to add a new drawShape:

1.