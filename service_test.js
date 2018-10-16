'use strict';

describe('Modulo app service test', function(){
    beforeEach(function () {
        module('testModule');
    });

    describe('Courses Service', function(){

        var coursesService;
        beforeEach(function () {
            inject(['CoursesService', function(service){
                coursesService = service;
            }]);
        });


        it('la function getdata no esta definida',function() {
            expect(coursesService.getData()).toBeDefined();
        })
    });
});