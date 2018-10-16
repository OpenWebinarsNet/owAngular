'use script';

describe('Modulo app filter test', function(){
    beforeEach(function () {
        module('testModule');
    });

    describe('filter test', function(){

        it('debe hacer el filtro correctamente', inject(function(reverseFilter) {
            var input = 'some test';
            var expectedOutput = 'some test---';
            expect(reverseFilter(input)).toEqual(expectedOutput);
        }));
    });
});