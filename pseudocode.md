- пройтись по айтемам
- while (sellIn > 0) sellIn - 1
- checkQuality(newQuality): Boolean(newQuality >= 0 && newQuality <= 50)
- brie: quality + x 
- sulfuras: noop
- backstage_passes: 
    if (sellIn === 0) quality = 0
    else if (sellIn < 5) quality += 3x
    else if (sellIn < 10) quality += 2x
    else quality += x
- conjured: sellIn = 0 ? quality - 4x : quality - 2x;
- default: sellIn = 0 ? quality - 2x : quality - x;