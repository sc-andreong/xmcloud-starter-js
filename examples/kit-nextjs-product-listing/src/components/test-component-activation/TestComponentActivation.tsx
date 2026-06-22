import React from 'react';
import { Text, Image } from '@sitecore-content-sdk/nextjs';

type TextField = { value: string };
type ImageField = { value: { src: string; alt: string } };

type ImageWithDescriptionDefaultFields = {
  image: ImageField;
  description: TextField;
};

type RenderingParams = Record<string, string>;

type ImageWithDescriptionDefaultProps = {
  rendering?: { uid?: string; params?: RenderingParams; dataSource?: string };
  fields?: ImageWithDescriptionDefaultFields;
};

export const Default = (props: ImageWithDescriptionDefaultProps) => {
  if (!props?.fields) return null;
  const defaultFields: ImageWithDescriptionDefaultFields = {
    image: { value: { src: '', alt: '' } },
    description: { value: '' },
  };
  const { fields = defaultFields } = props;
  const params = props?.rendering?.params ?? {};

  const bg = params.BackgroundColor || 'bg-white';
  const fg = params.TextColor || 'text-gray-900';
  const padding = params.Padding || 'p-6';
  const rounded = params.Rounded === 'false' ? '' : 'rounded-xl';
  const shadow = params.Shadow === 'none' ? '' : 'shadow-sm';
  const align = params.Alignment === 'center' ? 'items-center text-center' : params.Alignment === 'right' ? 'items-end text-right' : 'items-start text-left';
  const gap = params.Gap || 'gap-4';
  const direction = params.Direction === 'row' ? 'md:flex-row' : params.Direction === 'row-reverse' ? 'md:flex-row-reverse' : 'md:flex-col';

  const hasImage = !!fields?.image?.value?.src;
  const hasDescription = typeof fields?.description?.value === 'string' && fields.description.value.length > 0;

  return (
    <article
      data-component="ImageWithDescription"
      data-variant="Variant"
      className={[
        'w-full',
        'flex',
        'flex-col',
        direction,
        gap,
        padding,
        bg,
        fg,
        rounded,
        shadow,
        'transition-shadow',
        'duration-200',
        'hover:shadow-md',
      ].join(' ')}
      aria-labelledby={props?.rendering?.uid ? `${props.rendering.uid}-desc` : undefined}
    >
      {hasImage ? (
        <figure className={[
          'w-full',
          'flex',
          'justify-center',
        ].join(' ')}>
          <div className="w-full max-w-full md:max-w-[50%]">
            <Image field={fields.image} className="w-full h-auto object-cover rounded-lg" />
          </div>
        </figure>
      ) : null}
      {hasDescription ? (
        <section className={['w-full flex', align].join(' ')}>
          <div className="w-full md:max-w-[50%]">
            <p id={props?.rendering?.uid ? `${props.rendering.uid}-desc` : undefined} className="text-base leading-7">
              <Text field={fields.description} />
            </p>
          </div>
        </section>
      ) : null}
    </article>
  );
};
