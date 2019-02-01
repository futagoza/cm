function Step() {
    var i = -1, steps = arguments, result;
    if ( steps.length === 0 ) return;
    function next() {
        result = steps[ ++i ].apply( next, arguments );
    }
    while ( i < steps.length ) {
        next( result );
    }
}

module.exports = Step;
