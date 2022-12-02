class Item {
    constructor(name, sellIn, quality) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
}

const NAMES = {
  brie: 'BRIE',
  sulfuras: 'SULFURAS',
  backstage_passes: 'BACKSTAGE_PASSES',
  conjured: 'CONJURED',
};
const QUALITY_DELTA = 1;
const SELLIN_DELTA = 1;
const QUALITY_LOWER_LIMIT = 0;
const QUALITY_HIGHER_LIMIT = 50;
const EXPIRED_SELL_IN = 0;

const highQualityPassesSellIn = 10;
const veryHighQualityPassesSellIn = 5;
const highQualityMultiplier = 2;
const veryHighQualityMultiplier = 3;
const conjuredMultiplier = 2;
  
class Shop {
    constructor(items = []) {
      this.items = items;
    }
    _isQualityValid(quality) {
      return quality <= QUALITY_HIGHER_LIMIT && quality >= QUALITY_LOWER_LIMIT;
    }
    getNewQualityBRIE({quality}) {
      return quality + QUALITY_DELTA;
    }
    getNewQualitySULFURAS({quality}) {
      return quality;
    }
    getNewQualityBACKSTAGE_PASSES({sellIn, quality}) {
      if (sellIn === EXPIRED_SELL_IN) {
        return QUALITY_LOWER_LIMIT
      } else if (sellIn <= veryHighQualityPassesSellIn) {
        return quality + veryHighQualityMultiplier * QUALITY_DELTA
      } else if (sellIn <= highQualityPassesSellIn) {
        return quality + highQualityMultiplier * QUALITY_DELTA
      } else {
        return quality + QUALITY_DELTA
      }
    }
    getNewQualityDEFAULT({sellIn, quality, delta = QUALITY_DELTA}) {
      if (sellIn === 0) {
        return quality - delta * 2
      } else {
        return quality - delta;
      }
    }
    getNewQualityCONJURED({sellIn, quality}) {
      return this.getNewQualityDEFAULT({sellIn, quality, delta: QUALITY_DELTA * conjuredMultiplier})
    }
    getNewSellIn(sellIn) {
      if (sellIn - 1 >= EXPIRED_SELL_IN) {
        return sellIn - SELLIN_DELTA;
      }

      return sellIn
    }
    updateQuality() {
      this.items = this.items.map(({sellIn, quality, name}) => {
        const methodName = `getNewQuality${NAMES[name] ?? 'DEFAULT'}`;
        const newItem = {
          name,
          sellIn: this.getNewSellIn(sellIn),
          quality: this[methodName]({sellIn, quality})
        };

        if (!this._isQualityValid(newItem.quality)) {
          newItem.quality = quality;
        }

        return newItem;
      });

      return this.items;
    }
}
  
module.exports = {
    Item,
    Shop
};