import { sum } from "../helpers/sum";

describe('sum func', ()=>{
    it('should return sum', ()=>{
        const result = sum(1,2);
        expect(result).toBe(3);
    })
});