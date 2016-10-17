class BrewCalculator {
  /*
  * STANDARD NAMING CONVENTION
  * v = Volume
  * w = weight
  * r = rate
  * g = gravity
  * t = temperature
  * i = time
  */

  const CF_PPG_TO_PKL = 8.345 //conversion factor: Points/Pounds/Gallon to Points/Kilo/Litre.
  const CF_KG_TO_LB = 2.205 //Conversion factor: Kilograms to Pounds
  const CF_L_TO_GAL = 0.264 //Conversion factor: Litres to Gallons

  /**
  * gFinal
  * Estimates what the final gravity is
  * attenuation: How much sugar is consumed by the yeast; 100% being all sugars are consumed. ranges between 0 and 1
  * gOriginal: The orignal specific gravity.
  **/
  gFinal = function(attenuation,gOriginal) {
    if(percentileNotInRange(attenuation)){ return false; }
    if(isNegative(gOriginal)){ return false; }

    return ((gOriginal - 1) * (1 - attenuation)) + 1;
  }

  /**
  * gPoints
  * Calculates how many gravity points a volume will have.
  * gOriginal: The original specific gravity reading.
  * v: The volume of liquid when the original gravity reading was taken.
  **/
  gPoints = function(gOriginal,v){
    if(isNegative(gOriginal)){ return false; }
    if(isNegative(v)){ return false; }

    return ((gOriginal - 1) * 1000 * v);
  }

  /**
  * wGrain
  * Determines the weight of a grain to achieve a desired gravity.
  * gPoints: The desired gravity points to achieve. (Use gPoints function)
  * extractPotential: The maximum potential of sugars that can be extracted from a grain
  * efficiency: The effective potential extraction of sugars from a grain during mash.
  * pkl: Gravity Points per Kilo of grain per Litre of water (use pkl function if converting from Points/Pound/Gallon)
  */
  wGrain = function(gPoints,extractPotential,efficiency,pkl){
    if(percentileNotInRange(extractPotential)){ return false; }
    if(percentileNotInRange(efficiency)){ return false; }
    if(isNegative(gPoints)){ return false; }
    if(isNegative(pkl)){ return false; }

    return (gPoints / (extractPotential * efficiency * pkl));
  }

  /**
  * mcu
  * Malt Colour Units. Determines potential colour the malt contributes to the beer
  * wGrain: The weight of the grain
  * lovibond:
  **/

  /**
  * pkl
  * Converts Points per Pound per Gallon to Points per Kilo per Litre
  * ppg: Gravity Points per Pound of Grains per Gallon of Water
  */
  pkl = function(ppg){
    return ppg * CF_PPG_TO_PKL;
  }

  /**
  * percentileNotInRange
  * Checks if a decimal value is between 0 and 1 inclusive
  **/
  percentileNotInRange(percentInDecimal){
    if(percentInDecimal < 0 || percentInDecimal > 1) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
  * isNegative
  * Checks if an integer is a negative number
  **/
  isNegative = function(value){
    if(value < 0){ return true }
    else { return false }
  }
}
