const {Shop, Item} = require('./index');


const mockItem = {
    name: 'item',
    sellIn: 10,
    quality: 25,
};
const QUALITY_LOWER_LIMIT = 0;
const QUALITY_HIGHER_LIMIT = 50;

// * Test goes here
describe('Goods with increasing quality:', () => {
    it('should not overflow upper limit of quality', () => {
        const item = new Item('brie', mockItem.sellIn, QUALITY_HIGHER_LIMIT);
        const shop = new Shop([item]);

        const res = shop.updateQuality();

        expect(res[0].quality).toEqual(QUALITY_HIGHER_LIMIT);
    })
    it('should increase quality', () => {
        const item = new Item('brie', mockItem.sellIn, QUALITY_LOWER_LIMIT);
        const shop = new Shop([item]);

        const res = shop.updateQuality();

        expect(res[0].quality).toBeGreaterThan(QUALITY_LOWER_LIMIT);
    })
})

describe('Goods with decreasing quality:', () => {
    it('should not overflow lower limit of quality', () => {
        const item = new Item(mockItem.name, mockItem.sellIn, QUALITY_LOWER_LIMIT);
        const shop = new Shop([item]);

        const res = shop.updateQuality();

        expect(res[0].quality).toEqual(QUALITY_LOWER_LIMIT);
    })
    it('should decrease quality', () => {
        const item = new Item(mockItem.name, mockItem.sellIn, QUALITY_HIGHER_LIMIT);
        const shop = new Shop([item]);

        const res = shop.updateQuality();

        expect(res[0].quality).toBeLessThan(QUALITY_HIGHER_LIMIT);
    })
    it('should decrease quality twice faster when sellIn is expired', () => {
        const expiredItem = new Item(mockItem.name, 0, mockItem.quality);
        const item = new Item(mockItem.name, mockItem.sellIn, mockItem.quality)
        const shop = new Shop([expiredItem, item]);

        const [newExpiredItem, newItem] = shop.updateQuality();
        const expiredItemQualityOffset = expiredItem.quality - newExpiredItem.quality;
        const itemQualityOffset = item.quality - newItem.quality;

        expect(expiredItemQualityOffset / 2).toEqual(itemQualityOffset)
    })
})