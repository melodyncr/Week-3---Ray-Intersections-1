//In Class Lecture
var Plane = function(normal, validPoint) {

    if (!(this instanceof Plane)) {
        console.error("Calling Plane constroctor as a function");
    }

    if (normal === undefined) {
        this.normal = new Vector3(0, 1, 0);
    } else {
        this.normal = normal.normalized();
    }

    if (validPoint === undefined) {
        this.validPoint = new Vector3(0, 0, 0)
    } else {
        this.validPoint = validPoint;
    }

    this.raycast = function(ray) {
        // the MATH
        //like the implicit sphere, we are solving for the alpha distance along the ray at which
        // the insterection pccurs. For a plane this lookes like:
        // alpha = (normal dot validpoint * normal dot rayOrigin)/ (normal dot rayDirection)
        var numerator = this.normal.dot(this.validPoint) - this.normal.dot(ray.origin);
        var denominator = this.normal.dot(ray.direction);

        var alpha = numerator / denominator;

        if (alpha > 0 && this.normal.dot(ray.direction) < 0) {
            return {
                hit: true, //type bool
                point: ray.origin.clone().add(ray.direction.clone().multiplyScalar(alpha)), //type Vector3
                normal: this.normal, //type Vector3
                distance: alpha

            };

        } else {
            return {
                hit: false
            }
        }
    }
}