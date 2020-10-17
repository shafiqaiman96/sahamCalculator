document.getElementById("totalBox").style.backgroundColor = "#169db2";
function calculate() {
  var buyPrice = document.getElementById("buy").value;
  var sellPrice = document.getElementById("sell").value;
  var share = document.getElementById("share").value;

  var totBuy = buyPrice * share;

  BUY_stampduty = Math.floor(totBuy / 1000);

  if (totBuy % 1000 != 0) {
    BUY_stampduty = BUY_stampduty + 1;
  }

  var BUY_brokerFee;
  var BUY_brokerFeeMin = 8;

  var isIntraday = document.getElementById("customCheck").checked;
  console.log(isIntraday);

  if (isIntraday || totBuy >= 50000) {
    BUY_brokerFee = totBuy * (0.05 / 100);
  } else {
    BUY_brokerFee = totBuy * (0.08 / 100);
  }

  if (BUY_brokerFee > BUY_brokerFeeMin) {
    BUY_brokerFee = BUY_brokerFee;
  } else {
    BUY_brokerFee = BUY_brokerFeeMin;
  }

  var newBUY_brokerFee = BUY_brokerFee + BUY_brokerFee * (6 / 100);

  var BUY_clearFee = (0.03 / 100) * totBuy;
  if (BUY_clearFee <= 1000) {
    BUY_clearFee;
  } else {
    BUY_clearFee = 1000;
  }
  //var BUY_stampduty = 1;

  var BUY_finalPrice = totBuy + newBUY_brokerFee + BUY_clearFee + BUY_stampduty;

  document.getElementById("totBuy").innerHTML =
    "Buying Price (RM): " + totBuy.toFixed(2);
  document.getElementById("BUY_brokerFee").innerHTML =
    "Broker Fee (RM): " + newBUY_brokerFee.toFixed(2);
  document.getElementById("BUY_clearFee").innerHTML =
    "Clearance Fee (RM): " + BUY_clearFee.toFixed(2);
  document.getElementById("BUY_stampduty").innerHTML =
    "Stamp Duty (RM): " + BUY_stampduty.toFixed(2);
  document.getElementById("BUY_finalPrice").innerHTML =
    "Contract Price (RM): " + BUY_finalPrice.toFixed(2);

  var totSell = sellPrice * share;

  SELL_stampduty = Math.floor(totSell / 1000);

  if (totSell % 1000 != 0) {
    SELL_stampduty = SELL_stampduty + 1;
  }

  var SELL_brokerFee;
  var SELL_brokerFeeMin = 8;
  if (isIntraday || totSell >= 50000) {
    SELL_brokerFee = totSell * (0.05 / 100);
  } else {
    SELL_brokerFee = totSell * (0.08 / 100);
  }

  if (SELL_brokerFee < SELL_brokerFeeMin) {
    SELL_brokerFee = SELL_brokerFeeMin;
  }

  var newSELL_brokerFee = SELL_brokerFee + SELL_brokerFee * (6 / 100);

  var SELL_clearFee = (0.03 / 100) * totSell;
  if (SELL_clearFee > 1000) {
    SELL_clearFee = 1000;
  }

  var SELL_finalPrice =
    totSell - newSELL_brokerFee - SELL_clearFee - SELL_stampduty;

  document.getElementById("totSell").innerHTML =
    "Selling Price (RM): " + totSell.toFixed(2);
  document.getElementById("SELL_brokerFee").innerHTML =
    "Broker Fee (RM): " + newSELL_brokerFee.toFixed(2);
  document.getElementById("SELL_clearFee").innerHTML =
    "Clearance Fee (RM): " + SELL_clearFee.toFixed(2);
  document.getElementById("SELL_stampduty").innerHTML =
    "Stamp Duty (RM): " + SELL_stampduty.toFixed(2);
  document.getElementById("SELL_finalPrice").innerHTML =
    "Contract Price (RM): " + SELL_finalPrice.toFixed(2);

  var FINAL_price = SELL_finalPrice - BUY_finalPrice;
  //var FINAL_percent = 100 - ((BUY_finalPrice / SELL_finalPrice) * 100);
  var FINAL_percent = (FINAL_price / BUY_finalPrice) * 100;
  document.getElementById("FINAL_price").innerHTML =
    FINAL_price.toFixed(2) + " (" + FINAL_percent.toFixed(2) + "%)";

  var roundFINAL_price = Math.round(FINAL_price);
  if (roundFINAL_price == 0) {
    document.getElementById("totalBox").style.backgroundColor = "#ff7600";
  } else if (Math.round(roundFINAL_price) >= 1) {
    document.getElementById("totalBox").style.backgroundColor = "#28a745";
  } else {
    document.getElementById("totalBox").style.backgroundColor = "red";
  }
}

$("#btnSubmit").click(function (event) {
  // Fetch form to apply custom Bootstrap validation
  var form = $("#myForm");

  if (form[0].checkValidity() === false) {
    $("#myModal").modal();
    event.preventDefault();
    event.stopPropagation();
  } else {
    form.addClass("was-validated");
    calculate();
  }
});
