class Item {
    constructor(name, sellIn, quality) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
}

const NAMES = {
  BRIE: 'brie',
  SULFURAS: 'sulfuras',
  BACKSTAGE_PASSES: 'backstage_passes',
  CONJURED: 'conjured',
};
const QUALITY_DELTA = 1;
const SELLIN_DELTA = 1;
const QUALITY_LOWER_LIMIT = 0;
const QUALITY_HIGHER_LIMIT = 50;
const EXPIRED_SELL_IN = 0;

const highQualityPassesSellIn = 10;
const veryHighQualitPassesSellIn = 5;
const highQualityMultiplier = 2;
const veryHighQualitMultiplier = 3;
const conjuredMultiplier = 2;
  
class Shop {
    constructor(items = []) {
      this.items = items;
    }
    _isQualityValid(quality) {
      return quality <= QUALITY_HIGHER_LIMIT && quality >= QUALITY_LOWER_LIMIT;
    }
    /* updateQuality() {
      for (let i = 0; i < this.items.length; i++) {
        if (
          this.items[i].name != "brie" &&
          this.items[i].name != "backstage_passes"
        ) {
          if (this.items[i].quality > 0) {
            if (this.items[i].name != "sulfuras") {
              this.items[i].quality = this.items[i].quality - 1;
            }
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
            if (
              this.items[i].name == "backstage_passes"
            ) {
              if (this.items[i].sellIn < 11) {
                if (this.items[i].quality < 50) {
                  this.items[i].quality = this.items[i].quality + 1;
                }
              }
              if (this.items[i].sellIn < 6) {
                if (this.items[i].quality < 50) {
                  this.items[i].quality = this.items[i].quality + 1;
                }
              }
            }
          }
        }
        if (this.items[i].name != "sulfuras") {
          this.items[i].sellIn = this.items[i].sellIn - 1;
        }
        if (this.items[i].sellIn < 0) {
          if (this.items[i].name != "brie") {
            if (
              this.items[i].name != "backstage_passes"
            ) {
              if (this.items[i].quality > 0) {
                if (this.items[i].name != "sulfuras") {
                  this.items[i].quality = this.items[i].quality - 1;
                }
              }
            } else {
              this.items[i].quality =
                this.items[i].quality - this.items[i].quality;
            }
          } else {
            if (this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1;
            }
          }
        }
      }
  
      return this.items;
    } */
    updateQuality() {
      this.items = this.items.map(({sellIn, quality, name}) => {
        const newItem = {
          name,
          sellIn, 
          quality,
        };

        if (sellIn - 1 >= EXPIRED_SELL_IN) {
          newItem.sellIn -= SELLIN_DELTA;
        }

        switch (name) {
          case NAMES.BRIE:
            newItem.quality = quality + QUALITY_DELTA
            break;
          case NAMES.SULFURAS:
            break;
          case NAMES.BACKSTAGE_PASSES:
            if (sellIn === EXPIRED_SELL_IN) {
              newItem.quality = QUALITY_LOWER_LIMIT
            } else if (sellIn <= veryHighQualitPassesSellIn) {
              newItem.quality += veryHighQualitMultiplier * QUALITY_DELTA
            } else if (sellIn <= highQualityPassesSellIn) {
              newItem.quality += highQualityMultiplier * QUALITY_DELTA
            } else {
              newItem.quality += QUALITY_DELTA
            }
            break;
          case NAMES.CONJURED:
            if (sellIn === 0) {
              newItem.quality = quality - conjuredMultiplier * QUALITY_DELTA * 2
            } else {
              newItem.quality = quality - conjuredMultiplier * QUALITY_DELTA;
            }
            break;
          default:
            if (sellIn === 0) {
              newItem.quality = quality - QUALITY_DELTA * 2
            } else {
              newItem.quality = quality - QUALITY_DELTA;
            }
            break;
        }

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