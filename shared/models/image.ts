import { ContentItem, Elements } from 'kentico-cloud-delivery';

/**
 * Generated by 'kentico-cloud-model-generator-utility@2.1.0'
 * Timestamp: Thu Sep 05 2019 13:36:04 GMT+0200 (GMT+02:00)
 *
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Image extends ContentItem {
  public border: Elements.MultipleChoiceElement;
  public zoomable: Elements.MultipleChoiceElement;
  public description: Elements.RichTextElement;
  public imageWidth: Elements.MultipleChoiceElement;
  public url: Elements.TextElement;
  public image: Elements.AssetsElement;

  constructor() {
    super({
      propertyResolver: ((elementName: string) => {
        if (elementName === 'image_width') {
          return 'imageWidth';
        }
        return elementName;
      })
    });
  }
}
