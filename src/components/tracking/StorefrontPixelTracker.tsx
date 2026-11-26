"use client";

import React, { useEffect } from "react";
import Script from "next/script";

export interface TrackingEventPayload {
  name: "ViewContent" | "InitiateCheckout" | "Purchase";
  eventId?: string;
  value?: number;
  currency?: string;
  contentName?: string;
  contentId?: string;
}

interface StorefrontPixelTrackerProps {
  tier?: string | null;
  metaPixelId?: string | null;
  tiktokPixelId?: string | null;
  gaMeasurementId?: string | null;
  event?: TrackingEventPayload;
}

export function trackStorefrontEvent(event: TrackingEventPayload) {
  if (typeof window === "undefined") return;
  const w = window as any;
  const currency = event.currency || "IDR";
  const value = typeof event.value === "number" ? event.value : 0;

  // 1. Meta Pixel
  if (typeof w.fbq === "function") {
    w.fbq(
      "track",
      event.name,
      {
        value,
        currency,
        content_name: event.contentName,
        content_ids: event.contentId ? [event.contentId] : undefined,
        content_type: "product",
      },
      event.eventId ? { eventID: event.eventId } : undefined
    );
  }

  // 2. Google Analytics 4 (GA4)
  if (typeof w.gtag === "function") {
    const gaEventName =
      event.name === "InitiateCheckout"
        ? "begin_checkout"
        : event.name === "Purchase"
        ? "purchase"
        : "view_item";
    w.gtag("event", gaEventName, {
      currency,
      value,
      transaction_id: event.eventId,
      items: event.contentName
        ? [
            {
              item_id: event.contentId || event.contentName,
              item_name: event.contentName,
              price: value,
              quantity: 1,
            },
          ]
        : undefined,
    });
  }

  // 3. TikTok Pixel
  if (w.ttq && typeof w.ttq.track === "function") {
    const ttEventName =
      event.name === "Purchase" ? "CompletePayment" : event.name;
    w.ttq.track(ttEventName, {
      value,
      currency,
      content_id: event.contentId,
      content_name: event.contentName,
      content_type: "product",
    });
  }
}

export function StorefrontPixelTracker({
  tier,
  metaPixelId,
  tiktokPixelId,
  gaMeasurementId,
  event,
}: StorefrontPixelTrackerProps) {
  const isProOrDfy = tier === "PRO" || tier === "DFY" || tier === "DFY_BUSINESS";
  const cleanMeta = isProOrDfy ? metaPixelId?.trim() : "";
  const cleanTiktok = isProOrDfy ? tiktokPixelId?.trim() : "";
  const cleanGa4 = isProOrDfy ? gaMeasurementId?.trim() : "";

  useEffect(() => {
    if (!isProOrDfy || !event) return;
    const timer = setTimeout(() => {
      trackStorefrontEvent(event);
    }, 350);
    return () => clearTimeout(timer);
  }, [isProOrDfy, event?.name, event?.eventId, event?.contentId, event?.value]);

  if (!isProOrDfy || (!cleanMeta && !cleanTiktok && !cleanGa4)) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 (GA4) */}
      {cleanGa4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanGa4)}`}
            strategy="afterInteractive"
          />
          <Script id="etalase-ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
              window.gtag('js', new Date());
              window.gtag('config', '${cleanGa4.replace(/[^a-zA-Z0-9_-]/g, "")}');
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel (Facebook / Instagram Ads) */}
      {cleanMeta && (
        <Script id="etalase-meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${cleanMeta.replace(/[^0-9]/g, "")}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* TikTok Pixel */}
      {cleanTiktok && (
        <Script id="etalase-tiktok-pixel-init" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${cleanTiktok.replace(/[^a-zA-Z0-9_-]/g, "")}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
    </>
  );
}
