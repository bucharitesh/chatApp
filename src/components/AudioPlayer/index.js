import React from 'react'

function AudioPlayer() {
    return (
        <Audio>
                <div class="_2rB2Y">
                  <div class="Hei0U">
                    <div class="GrwLb _2hsTo">
                      <div class="E2qvM">
                        <button class="_28Dfr">
                          <BsPlayFill size="2em"/>
                        </button>
                      </div>
                      <div class="_23Fho">
                        <span aria-label="Voice message"></span>
                        <div class="_2O_ZT">0:05</div><div class="sQ3Ia">
                          <span class="_3cCXU" style={{width: 0}}></span>
                          <input dir="ltr" type="range" class="_3TWTE" min="0" max="100" value="0" />
                            <audio autoplay preload="auto">
                              <source src={data.audioURL} type="audio/mpeg" />
                            </audio>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="_23QsC">
                    <div class="_1S-g9">
                      <div class="_2myan _1vuxa vDSDs">
                        <span data-testid="ptt-status" data-icon="ptt-status" class="">
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
        </Audio>
    )
}

const Audio = styled.div`
  padding: 6px;
  box-sizing: border-box;
  width: 236px;
  max-width: 100%;

  ._3MHVj ._2rB2Y {
    flex-direction: row-reverse;
}



.GrwLb {
    display: flex;
    align-items: center;
    direction: ltr;
}

._23Fho, .E2qvM {
    position: relative;
}
.E2qvM {
    display: block;
    flex: none;
    width: 34px;
    height: 34px;
    margin-top: -1px;
    margin-right: 12px;
}

._28Dfr {   
    width: 34px;
    height: 34px;
    background-color: inherit;
    color: white;
}

._23Fho {
    flex: 1;
}
._23Fho, .E2qvM {
    position: relative;
}

._2O_ZT {
    position: absolute;
    bottom: -19px;
    font-size: 11px;
    line-height: 15px;
    color: #fff;
}

._3TWTE {
    box-sizing: border-box;
    display: block;
    height: 21px;
    background-color: initial!important;
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

._3TWTE, .sQ3Ia {
    position: relative;
    width: 100%;
}

.sQ3Ia {
    top: -1px;
}

._3TWTE {
    box-sizing: border-box;
    display: block;
    height: 21px;
    background-color: initial!important;
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
`;

export default AudioPlayer