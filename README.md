# Bank Closures and Banking Deserts in the United States
## Datasets, cleaning and methodology 

### Main Data Sources
1. Census API for median household income, population data and other demographic data.
2. Federal Deposit Insurance Corporation (FDIC) bank branch [data](https://www7.fdic.gov/idasp/warp_download_all.asp) (2020).
3. Federal Reserve of St. Louis Equifax credit score [data](https://fred.stlouisfed.org/searchresults/?st=Equifax%20Subprime%20Credit%20Population%20).

### 1. Bank Data

This project uses the FDIC's bank branch data. I looked into whether the number of banks per head in a FIPs code (county) impacts median household income and credit scores for residents. This analysis helped pick out specific zip codes with very few banks, low household incomes and effective bank deserts. Specifically, my story looks into Imperial County, California, Apache County, Arizona and Caddo Parish, Louisiana. 

#### Points of interest in procuring and using bank data: 
1. In `bank_census_merge.ipynb`, I used the census API to read in median household income and population by FIPs code. Created a new column for the number of banks per head by counting banks in each FIP code. 
2. Spot tested 30 random rows to check if the FIPs code merging was accurate 
3. Tried to manually add in credit score data for the codes with the 10 lowest number of banks and 10 highest number of banks from FRED Economic Equifax data, but realized this sample was not significant and the process was inefficient. Scraped FRED in a different notebook. 

### 2. Credit Score Data

I merged in data points which show the percentage of residents per FIPs code who have a credit score under 660. I did not find a correlation between credit scores and number of banks per head in a county on my full dataset. However, the credit score data was useful in showing that residents in the final counties I focused on had significantly high credit score metrics (and so have low scores). 

#### Points of interest in scraping credit data: 
1. I scraped FRED Economic Equifax credit data per county. Requested census tract data, but this is the most granular data they had. 
2. Created URLs for each county based on county FIPs code, filling in 00 for shorter codes to complete the digit format
3. Made a loop to scrape each URL and append the annual credit score percent value to my table. 

### 3. Ensuring reliability of geolocation 

An expert told me there were errors in FDIC address data, and that their geocoding was incorrect. I randomly tested 100 rows of FDIC data and found an error rate under <5% in street addresses, which I thought was appropriate to use. I did this by plugging the address into Google Street View and checking to see if a bank appeared, or could realistically exist in the area. However >20% of tested coordinates seemed out of place, so I geolocated every bank in the country using the Google Maps API since I had street addresses. 

#### Points of interest in geolocating: 
1. Tested 100 rows to see if the latitude and longitudes they generated pointed to the same street addresses in their tables and found that over 20% did not. 
2. Used the Google Maps API to re-generate coordinates, as shown in `fdic_geocode_testing.ipynb`. 
3. Spot tested previous errors with newly generated coordinates to check validity — new Google Maps latitude and longitude were correct. 

### 4. Mapping and Visualizing to analyze: 
I used MapBox and QGIS in my analysis to look at where banks are concentrated, how spread out they are and to see whether there are visually obvious bank deserts. 
1. The `california_map` and `louisiana_map` folders within `visuals` contain `index.html`, `map.js` and `styles.css` each, which can be used to run the MapBox maps I looked at. Both zoom into the correct counties and show bank names and the total value of assets they hold (which is useful as a measure of how big the bank actually is). Both maps were generated from the geolocated FDIC data, filtered down to the county level. 
2. This point data is available in the `data` folder accompanying MapBox files as both `.csv` and `.geojson` files. 

### 5. Working with cell phone pattern data: 

I initially hoped to work with cell phone tracking data to figure out how far people from different census tract groups had to travel to go to a bank, if there was not one in their area. While I did analysis and cleaning for this, I later on dropped this aspect of the project because: 
1. The data was from a private company has cell phone data that could show me bank name, street address, visitor origins, median dwell time, popularity of location by hour of day (scaled) but the bank names and counts I extracted from here did not match the FDIC data I used. The data had fewer or more banks per county than FDIC data showed. They seemed to treat ATMs in supermarkets and liquor stores etc. as "banks" and so their counts were off — I assumed it was ATMs but had no way to know what their other inconsistencies were due to. 
2. This data included some financial institutions that are not mainstream banks which were not useful for the purpose of my project. 
3. All my other data is only by census level — the FRED credit data I have did not exist at a more granular level, so that analysis would have been incomplete. 
4. It is a private company and I had qualms about how reliable cell phone data is in rural areas. 

#### Points of interest in pattern data: 
1. Used the Google Maps API to generate latitude and longitude for all banks in New York State and merged, cleaned and combined with the dataset
2. Cleaned and separated the messy visitor origins column, which is CBGs for visitors to see where they travelled to the bank location from. 
3. Decided not to use this data because I compared it with FDIC data, which is from and official source, and there were inconsistencies, especially in rural areas where cell phone data may not be as reliable. 

 
