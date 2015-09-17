var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;

// Test timeouts
var testTimeout = 35000;

// Get User Media timeout
var gUMTimeout = 25000;

// Test item timeout
var testItemTimeout = 4000;

var timeStampMaxError = 60000;

if(webrtcDetectedBrowser == 'IE' || webrtcDetectedBrowser == 'safari') {
  
  describe('PluginAPI | EventHandler', function() {
    this.timeout(testTimeout);

    /* Attributes */
    var stream = null;
    var video = null;

    /* WebRTC Object should be initialized in Safari/IE Plugin */
    before(function (done) {
      this.timeout(testItemTimeout);

      AdapterJS.webRTCReady(function() {
        done();
      });
    });

    /* Get User Media */
    beforeEach(function (done) {
      this.timeout(gUMTimeout);

      window.navigator.getUserMedia({
        audio: true,
        video: true

      }, function (data) {
        stream = data;

        done();

      }, function (error) {
        throw error;
      });

      video = document.createElement('video');
      document.body.appendChild(video);
    });

    afterEach(function() {
      document.body.removeChild(video);
      stream = null;
    });

    it('plugin.addEventHandler :: existence', function(done) {
      this.timeout(testItemTimeout);
      video.id = 'video';

      video = attachMediaStream(video, stream);

      expect(video.addEventHandler).not.to.be.undefined;

      done();
    });

    it('plugin.addEventHandler :: behaviour', function(done) {
      this.timeout(testItemTimeout);
      video.id = 'video';

      video = attachMediaStream(video, stream);

      var func = function() {
        done();
      };

      video.addEventHandler("onplay",func);
      video.pause();
      video.play();
    });

  });
}


