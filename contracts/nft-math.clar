;; <NFT investor calculation>

;; constants
;;

;; data maps and vars
;; most of the variables here are from math and math-2 contracts
(define-data-var price-cont int 0)

(define-data-var term-len int 0)

(define-data-var btc-val-cont int 0)

(define-data-var curr-cont-val int 0)

(define-data-var anu-wit-draw int 0)  

(define-data-var nft-rev-opt-call int 0) 

(define-data-var btc-nft-yeild int 0)

(define-data-var year int 0)

(define-data-var tx-fee int 0)

(define-data-var est-btc-price int 0) 

;; mapping for calculating the NFT investment
(define-map nft-invest-cal {year: int}
    {
        btc-nft-yield: int,
        est-btc-price: int,
        nft-rev-usd: int,
        cont-price: int,
        usd-ret-opt-call: int,
        roi-opt-call: int,
        irr-opt-call: int
    }
)

;; private functions
;;

;; public functions
(define-public (nft-cal)
    (begin

        (if (is-eq (var-get year) 1) ;; for first year

            (ok (map-set nft-invest-cal {year: 1}
                    {
                        btc-nft-yield: (- 
                                            (var-get anu-wit-draw) 
                                            (var-get tx-fee)
                                        ),

                        est-btc-price: (var-get est-btc-price),

                        nft-rev-usd: (* 
                                        (- 
                                            (var-get anu-wit-draw) 
                                            (var-get tx-fee)
                                        ) 
                                        (var-get est-btc-price)
                                    ),

                        cont-price: (var-get nft-rev-opt-call),

                        usd-ret-opt-call: (- 
                                            (var-get price-cont) 
                                            (var-get nft-rev-opt-call)
                                        ),

                        roi-opt-call: (* 
                                        (/ 
                                            (- 
                                                (var-get price-cont) 
                                                (var-get nft-rev-opt-call)
                                            ) 
                                            (var-get price-cont)
                                        ) 
                                    100),

                        irr-opt-call: (/ 
                                        (- 
                                            (var-get price-cont) 
                                            (var-get nft-rev-opt-call)
                                        ) 
                                        (var-get price-cont)
                                    )
                    }
                )
            )
        
        

            (ok (map-set nft-invest-cal {year: (var-get year)}
                    {
                        btc-nft-yield: (- 
                                            (var-get anu-wit-draw) 
                                            (var-get tx-fee)
                                        ),

                        est-btc-price: (var-get est-btc-price),

                        nft-rev-usd: (* 
                                        (- 
                                            (var-get anu-wit-draw) 
                                            (var-get tx-fee)
                                        ) 
                                        (var-get est-btc-price)
                                    ),

                        cont-price: (var-get nft-rev-opt-call),

                        usd-ret-opt-call: (- 
                                            (var-get price-cont) 
                                            (var-get nft-rev-opt-call)
                                        ),

                        roi-opt-call: (* 
                                        (/ 
                                            (- 
                                                (var-get price-cont) 
                                                (var-get nft-rev-opt-call)
                                            ) 
                                            (var-get price-cont)
                                        ) 
                                    100),
                                    
                        irr-opt-call: (/ 
                                        (- 
                                            (var-get price-cont) 
                                            (var-get nft-rev-opt-call)
                                        ) 
                                        (var-get price-cont)
                                    )
                    }
                )
            )

        )

    )
)
