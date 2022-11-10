const {Shop, Item} = require('./index');


const mockItem = {
    name: 'item',
    sellIn: 20,
    quality: 25,
};
const QUALITY_LOWER_LIMIT = 0;
const QUALITY_HIGHER_LIMIT = 50;
const EXPIRED_SELL_IN = 0;

// * Test goes here
describe('Brie', () => {
    test('should not overflow upper limit of quality', () => {
        const item = new Item('brie', mockItem.sellIn, QUALITY_HIGHER_LIMIT);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toEqual(QUALITY_HIGHER_LIMIT);
    })
    test('should increase quality', () => {
        const item = new Item('brie', mockItem.sellIn, QUALITY_LOWER_LIMIT);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toBeGreaterThan(QUALITY_LOWER_LIMIT);
    })
})
describe('Sulfuras', () => {
    test('should keep the quality constant', () => {
        const item = new Item('sulfuras', QUALITY_LOWER_LIMIT, mockItem.quality);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toEqual(item.quality);
    });
})

describe('Backstage_passes', () => {
    const highQualityPassesSellIn = 10;
    const veryHighQualitPassesSellIn = 5;

    test('should not overflow upper limit of quality', () => {
        const item = new Item('backstage_passes', mockItem.sellIn, QUALITY_HIGHER_LIMIT);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toEqual(QUALITY_HIGHER_LIMIT);
    })
    test('should increase quality', () => {
        const item = new Item('backstage_passes', mockItem.sellIn, QUALITY_LOWER_LIMIT);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toBeGreaterThan(QUALITY_LOWER_LIMIT);
    })
    test(`should increase quality twice faster when sellIn is lower than ${highQualityPassesSellIn}`, () => {
        const item = new Item('backstage_passes', mockItem.sellIn, mockItem.quality);
        const secondItem = new Item('backstage_passes', highQualityPassesSellIn, mockItem.quality);
        const shop = new Shop([{...item}, {...secondItem}]);

        const [newItem, newSecondItem] = shop.updateQuality();
        const itemQualityOffset = newItem.quality - item.quality;
        const secondItemQualityOffset = newSecondItem.quality - secondItem.quality;

        expect(secondItemQualityOffset / 2).toEqual(itemQualityOffset);
    })
    test(`should increase quality trice faster when sellIn is lower than ${veryHighQualitPassesSellIn}`, () => {
        const item = new Item('backstage_passes', mockItem.sellIn, mockItem.quality);
        const secondItem = new Item('backstage_passes', veryHighQualitPassesSellIn, mockItem.quality);
        const shop = new Shop([{...item}, {...secondItem}]);

        const [newItem, newSecondItem] = shop.updateQuality();
        const itemQualityOffset = newItem.quality - item.quality;
        const secondItemQualityOffset = newSecondItem.quality - secondItem.quality;

        expect(secondItemQualityOffset / 3).toEqual(itemQualityOffset);
    })
    test('should drop quality to 0 when sellIn is expired', () => {
        const item = new Item('backstage_passes', EXPIRED_SELL_IN, mockItem.quality);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toEqual(QUALITY_LOWER_LIMIT);
    })
});

describe('Conjured items', () => {
    test('should not overflow lower limit of quality', () => {
        const item = new Item('conjured', mockItem.sellIn, QUALITY_LOWER_LIMIT);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toEqual(QUALITY_LOWER_LIMIT);
    })
    test('should decrease quality', () => {
        const item = new Item('conjured', mockItem.sellIn, QUALITY_HIGHER_LIMIT);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toBeLessThan(QUALITY_HIGHER_LIMIT);
    })
    test('should decrease quality twice faster when sellIn is expired', () => {
        const expiredItem = new Item('conjured', EXPIRED_SELL_IN, mockItem.quality);
        const item = new Item('conjured', mockItem.sellIn, mockItem.quality)
        const shop = new Shop([{...expiredItem}, {...item}]);

        const [newExpiredItem, newItem] = shop.updateQuality();
        const expiredItemQualityOffset = expiredItem.quality - newExpiredItem.quality;
        const itemQualityOffset = item.quality - newItem.quality;

        expect(expiredItemQualityOffset / 2).toEqual(itemQualityOffset)
    })
    test('should decrease quality twice faster comparing to default item', () => {
        const conjuredItem = new Item('conjured', mockItem.sellIn, mockItem.quality);
        const defaultItem = new Item(mockItem.name, mockItem.sellIn, mockItem.quality)
        const shop = new Shop([{...conjuredItem}, {...defaultItem}]);

        const [newConjuredItem, newDefaultItem] = shop.updateQuality();        
        const conjuredItemQualityOffset = conjuredItem.quality - newConjuredItem.quality;
        const defualtItemQualityOffset = defaultItem.quality - newDefaultItem.quality;

        expect(conjuredItemQualityOffset / 2).toEqual(defualtItemQualityOffset)
    })
    test('should decrease quality twice faster comparing to default item if expired', () => {
        const conjuredItem = new Item('conjured', EXPIRED_SELL_IN, mockItem.quality);
        const defaultItem = new Item(mockItem.name, EXPIRED_SELL_IN, mockItem.quality)
        const shop = new Shop([{...conjuredItem}, {...defaultItem}]);

        const [newConjuredItem, newDefaultItem] = shop.updateQuality();        
        const conjuredItemQualityOffset = conjuredItem.quality - newConjuredItem.quality;
        const defualtItemQualityOffset = defaultItem.quality - newDefaultItem.quality;

        expect(conjuredItemQualityOffset / 2).toEqual(defualtItemQualityOffset)
    })
})


describe('Default items', () => {
    test('should not overflow lower limit of quality', () => {
        const item = new Item(mockItem.name, mockItem.sellIn, QUALITY_LOWER_LIMIT);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toEqual(QUALITY_LOWER_LIMIT);
    })
    test('should decrease quality', () => {
        const item = new Item(mockItem.name, mockItem.sellIn, QUALITY_HIGHER_LIMIT);
        const shop = new Shop([{...item}]);

        const res = shop.updateQuality();

        expect(res[0].quality).toBeLessThan(QUALITY_HIGHER_LIMIT);
    })
    test('should decrease quality twice faster when sellIn is expired', () => {
        const expiredItem = new Item(mockItem.name, EXPIRED_SELL_IN, mockItem.quality);
        const item = new Item(mockItem.name, mockItem.sellIn, mockItem.quality)
        const shop = new Shop([{...expiredItem}, {...item}]);

        const [newExpiredItem, newItem] = shop.updateQuality();
        const expiredItemQualityOffset = expiredItem.quality - newExpiredItem.quality;
        const itemQualityOffset = item.quality - newItem.quality;

        expect(expiredItemQualityOffset / 2).toEqual(itemQualityOffset)
    })
})
